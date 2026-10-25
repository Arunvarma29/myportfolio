/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

export const up = (pgm) => {
  pgm.dropTable("services");
};


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  // Recreates the table structure if this migration is rolled back.
  // Deleted records will not be restored.
  pgm.createTable("services", {
    id: {
      type: "bigint",
      primaryKey: true,
      notNull: true,
      identity: "always",
    },
    slug: {
      type: "varchar(180)",
      notNull: true,
      unique: true,
    },
    title: {
      type: "varchar(160)",
      notNull: true,
    },
    short_description: {
      type: "varchar(300)",
    },
    description: {
      type: "text",
      notNull: true,
    },
    icon_name: {
      type: "varchar(80)",
    },
    features: {
      type: "text[]",
      notNull: true,
      default: pgm.func("ARRAY[]::TEXT[]"),
    },
    sort_order: {
      type: "integer",
      notNull: true,
      default: 0,
    },
    is_visible: {
      type: "boolean",
      notNull: true,
      default: true,
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("NOW()"),
    },
    updated_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("NOW()"),
    },
  });

  pgm.createIndex("services", ["sort_order", "id"], {
    name: "services_order_idx",
  });
};
