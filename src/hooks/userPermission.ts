import { UserI } from "../store";

export const userPermission = () => {
  const allowedRoles = ["admin", "manager"];

  const hasPermission = (user: UserI | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };

  return {
    isAllowed: hasPermission,
  };
};
