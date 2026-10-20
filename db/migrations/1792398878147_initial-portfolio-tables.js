/* eslint-disable camelcase */

// Portfolio schema for Neon (node-pg-migrate, ES module)
//
// Content tables : about_me, projects, project_images, skills, experience,
//                  education, social_links, contact_messages
// Admin auth     : admins (single admin), password_reset_tokens (forgot password)

// Tables that have an updated_at column and need the trigger
const TABLES_WITH_UPDATED_AT = [
  'about_me',
  'projects',
  'education',
  'skills',
  'experience',
  'social_links',
  'admins',
];

export const up = (pgm) => {
  // Reusable column definitions
  const id = { type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()') };
  const created_at = { type: 'timestamptz', notNull: true, default: pgm.func('now()') };
  const updated_at = { type: 'timestamptz', notNull: true, default: pgm.func('now()') };
  const sort_order = { type: 'integer', notNull: true, default: 0 };

  // Keeps updated_at current on every UPDATE
  pgm.createFunction(
    'set_updated_at',
    [],
    { returns: 'trigger', language: 'plpgsql', replace: true },
    `BEGIN
       NEW.updated_at = now();
       RETURN NEW;
     END;`
  );

  // =====================================================================
  // Content tables
  // =====================================================================

  // ---------- about_me (exactly one row) ----------
  pgm.createTable('about_me', {
    id,
    // singleton + unique + check => the table can never hold more than one row
    singleton: { type: 'boolean', notNull: true, default: true, unique: true },
    full_name: { type: 'text', notNull: true },
    headline: { type: 'text' },
    bio: { type: 'text' },
    avatar_url: { type: 'text' },
    resume_url: { type: 'text' },
    email: { type: 'text' },
    phone: { type: 'text' },
    location: { type: 'text' },
    created_at,
    updated_at,
  });
  pgm.addConstraint('about_me', 'about_me_singleton_check', { check: 'singleton = true' });

  // ---------- projects ----------
  pgm.createTable('projects', {
    id,
    title: { type: 'text', notNull: true },
    slug: { type: 'text', notNull: true, unique: true },
    summary: { type: 'text' },
    description: { type: 'text' },
    thumbnail_url: { type: 'text' },
    live_url: { type: 'text' },
    repo_url: { type: 'text' },
    tech_stack: { type: 'text[]', notNull: true, default: '{}' },
    is_featured: { type: 'boolean', notNull: true, default: false },
    is_published: { type: 'boolean', notNull: true, default: true },
    sort_order,
    created_at,
    updated_at,
  });
  pgm.addConstraint('projects', 'projects_slug_format_check', {
    check: "slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'",
  });
  pgm.createIndex('projects', ['is_published', 'sort_order']);

  // ---------- project_images (many per project) ----------
  pgm.createTable('project_images', {
    id,
    project_id: {
      type: 'uuid',
      notNull: true,
      references: 'projects(id)',
      onDelete: 'CASCADE',
    },
    image_url: { type: 'text', notNull: true },
    alt_text: { type: 'text' },
    caption: { type: 'text' },
    sort_order,
    created_at,
  });
  pgm.createIndex('project_images', ['project_id', 'sort_order']);

  // ---------- contact_messages (contact form submissions) ----------
  pgm.createTable('contact_messages', {
    id,
    name: { type: 'text', notNull: true },
    email: { type: 'text', notNull: true },
    subject: { type: 'text' },
    message: { type: 'text', notNull: true },
    is_read: { type: 'boolean', notNull: true, default: false },
    created_at,
  });
  pgm.addConstraint('contact_messages', 'contact_messages_email_check', {
    check: "email ~* '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'",
  });
  pgm.addConstraint('contact_messages', 'contact_messages_length_check', {
    check: 'char_length(name) <= 200 AND char_length(message) <= 5000',
  });
  pgm.createIndex('contact_messages', ['is_read', { name: 'created_at', sort: 'DESC' }]);

  // ---------- education ----------
  pgm.createTable('education', {
    id,
    institution: { type: 'text', notNull: true },
    degree: { type: 'text' },
    field_of_study: { type: 'text' },
    start_date: { type: 'date' },
    end_date: { type: 'date' },
    description: { type: 'text' },
    sort_order,
    created_at,
    updated_at,
  });
  pgm.addConstraint('education', 'education_dates_check', {
    check: 'end_date IS NULL OR start_date IS NULL OR end_date >= start_date',
  });

  // ---------- skills ----------
  pgm.createTable('skills', {
    id,
    name: { type: 'text', notNull: true },
    category: { type: 'text' },
    proficiency: { type: 'smallint' },
    icon_url: { type: 'text' },
    sort_order,
    created_at,
    updated_at,
  });
  pgm.addConstraint('skills', 'skills_proficiency_check', {
    check: 'proficiency IS NULL OR proficiency BETWEEN 0 AND 100',
  });
  pgm.createIndex('skills', ['category', 'sort_order']);

  // ---------- experience ----------
  pgm.createTable('experience', {
    id,
    company: { type: 'text', notNull: true },
    role: { type: 'text', notNull: true },
    location: { type: 'text' },
    employment_type: { type: 'text' },
    start_date: { type: 'date', notNull: true },
    end_date: { type: 'date' },
    is_current: { type: 'boolean', notNull: true, default: false },
    description: { type: 'text' },
    sort_order,
    created_at,
    updated_at,
  });
  pgm.addConstraint('experience', 'experience_dates_check', {
    check: 'end_date IS NULL OR end_date >= start_date',
  });
  pgm.addConstraint('experience', 'experience_current_check', {
    check: 'NOT (is_current AND end_date IS NOT NULL)',
  });

  // ---------- social_links ----------
  pgm.createTable('social_links', {
    id,
    platform: { type: 'text', notNull: true },
    url: { type: 'text', notNull: true },
    icon: { type: 'text' },
    sort_order,
    created_at,
    updated_at,
  });

  // =====================================================================
  // Admin auth (single email + password, with forgot-password)
  // =====================================================================

  // ---------- admins (exactly one row) ----------
  pgm.createTable('admins', {
    id,
    singleton: { type: 'boolean', notNull: true, default: true, unique: true },
    email: { type: 'text', notNull: true, unique: true },
    password_hash: { type: 'text', notNull: true }, // bcrypt / argon2 hash, never the plain password
    name: { type: 'text' },
    last_login_at: { type: 'timestamptz' },
    created_at,
    updated_at,
  });
  pgm.addConstraint('admins', 'admins_singleton_check', { check: 'singleton = true' });
  pgm.addConstraint('admins', 'admins_email_lowercase_check', { check: 'email = lower(email)' });

  // ---------- password_reset_tokens ----------
  pgm.createTable('password_reset_tokens', {
    id,
    admin_id: {
      type: 'uuid',
      notNull: true,
      references: 'admins(id)',
      onDelete: 'CASCADE',
    },
    // Store only a SHA-256 hash; the raw token goes in the emailed link
    token_hash: { type: 'text', notNull: true, unique: true },
    expires_at: { type: 'timestamptz', notNull: true },
    used_at: { type: 'timestamptz' }, // set when consumed (one-time use)
    created_at,
  });
  pgm.createIndex('password_reset_tokens', 'admin_id');
  pgm.createIndex('password_reset_tokens', 'expires_at');

  // =====================================================================
  // updated_at triggers
  // =====================================================================
  TABLES_WITH_UPDATED_AT.forEach((table) => {
    pgm.createTrigger(table, `${table}_set_updated_at`, {
      when: 'BEFORE',
      operation: 'UPDATE',
      level: 'ROW',
      function: 'set_updated_at',
    });
  });
};

export const down = (pgm) => {
  // Children first; dropping a table also drops its triggers and constraints
  pgm.dropTable('password_reset_tokens');
  pgm.dropTable('admins');
  pgm.dropTable('project_images');
  pgm.dropTable('social_links');
  pgm.dropTable('experience');
  pgm.dropTable('skills');
  pgm.dropTable('education');
  pgm.dropTable('contact_messages');
  pgm.dropTable('projects');
  pgm.dropTable('about_me');
  pgm.dropFunction('set_updated_at', []);
};