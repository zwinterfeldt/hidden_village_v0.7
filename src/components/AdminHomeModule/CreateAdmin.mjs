import { writeNewUserToDatabase } from "./CreateAdminForOrg.mjs";

const UserPermissions = {
    Admin: 'Admin',
    Developer: 'Developer',
    Teacher: 'Teacher',
    Student: 'Student',
};

const adminUserEmail = "RSD2Admin@email.com"
const adminUserRole = UserPermissions.Admin
const adminUserOrganization = "Rania's School of Design Two"
const adminUserPassword = "admin1"

writeNewUserToDatabase(adminUserEmail,adminUserRole,adminUserPassword,adminUserOrganization);

// node src/components/AdminHomeModule/CreateAdmin.mjs
// ctrl c <- once complete