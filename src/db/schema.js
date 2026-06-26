module.exports = [
  `CREATE TABLE IF NOT EXISTS links (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    product_name VARCHAR(255) NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NULL,
    og_image_url TEXT NULL,
    primary_target_url TEXT NOT NULL,
    deep_link_url TEXT NULL,
    fallback_url TEXT NULL,
    platform_rules_json JSON NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS clicks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    link_id BIGINT UNSIGNED NULL,
    slug_snapshot VARCHAR(255) NULL,
    ip_hash CHAR(64) NOT NULL,
    user_agent TEXT NULL,
    referer TEXT NULL,
    source_param VARCHAR(255) NULL,
    device_type VARCHAR(50) NULL,
    os VARCHAR(100) NULL,
    country VARCHAR(10) NULL,
    is_bot TINYINT(1) NOT NULL DEFAULT 0,
    traffic_class VARCHAR(50) NOT NULL,
    final_target TEXT NULL,
    redirect_status INT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_clicks_link_id (link_id),
    INDEX idx_clicks_slug_snapshot (slug_snapshot),
    INDEX idx_clicks_created_at (created_at)
  )`,
  `CREATE TABLE IF NOT EXISTS allowed_domains (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hostname VARCHAR(255) NOT NULL UNIQUE,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  `CREATE TABLE IF NOT EXISTS rules (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    link_id BIGINT UNSIGNED NOT NULL,
    priority INT NOT NULL DEFAULT 100,
    condition_json JSON NULL,
    target_url TEXT NOT NULL,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rules_link_id (link_id)
  )`,
  `CREATE TABLE IF NOT EXISTS campaigns (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    source VARCHAR(100) NULL,
    medium VARCHAR(100) NULL,
    content VARCHAR(255) NULL,
    notes TEXT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`
];
