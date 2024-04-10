import { writeNewUserToDatabase } from "./CreateAdminForOrg.mjs";

const UserPermissions = {
    Admin: 'Admin',
    Developer: 'Developer',
    Teacher: 'Teacher',
    Student: 'Student',
};

const adminUserEmail = "DELETE5Admin@email.com"
const adminUserRole = UserPermissions.Admin
const adminUserOrganization = "Minnesota State University, Mankato"
const adminUserPassword = "admin1"

writeNewUserToDatabase(adminUserEmail,adminUserRole,adminUserPassword,adminUserOrganization);