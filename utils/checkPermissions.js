import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (user, resourceUserId) => {
    if (user?.userId === resourceUserId?.toString()) return;

    throw new UnAuthenticatedError('Not authorized to perform this action!');
}

export default checkPermissions;