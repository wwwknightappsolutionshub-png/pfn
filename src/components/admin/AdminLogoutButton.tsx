"use client";

import { Link, useConfig, useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";

/** Visible logout control for the admin sidebar (replaces icon-only default). */
export function AdminLogoutButton() {
  const { t } = useTranslation();
  const { config } = useConfig();
  const adminRoute = config.routes.admin;
  const logoutRoute = config.admin.routes.logout;

  return (
    <Link
      aria-label={t("authentication:logOut")}
      className="nav__log-out pln-admin-logout-btn"
      href={formatAdminURL({ adminRoute, path: logoutRoute })}
      prefetch={false}
      title={t("authentication:logOut")}
    >
      <span className="pln-admin-logout-btn__label">
        {t("authentication:logOut")}
      </span>
    </Link>
  );
}
