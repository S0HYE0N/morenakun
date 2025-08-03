export type NavItemProps = {
  href: string;
  label: string;
  icon: (props: { active: boolean }) => React.ReactNode;
};

export type ProfileMenuProps = {
  name: string;
  department: string;
  onLogout: () => void;
  onSettings: () => void;
};

export type BreadcrumbProps = { onToggleSidebar: () => void };
