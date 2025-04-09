import { writeNewUserToDatabase } from "./CreateAdminForOrg.mjs";

const UserPermissions = {
    Admin: 'Admin',
    Developer: 'Developer',
    Teacher: 'Teacher',
    Student: 'Student',
};

const adminUserEmail = "breamer19@outlook.com"
const adminUserEmail = "yp0980kq@go.minnstate.edu"
const adminUserRole = UserPermissions.Admin
const adminUserOrganization = "MSUMankato"
const adminUserPassword = "Admin1"
const adminUserOrganization = "Minnesota State University, Mankato"
const adminUserPassword = "123456789"

writeNewUserToDatabase(adminUserEmail,adminUserRole,adminUserPassword,adminUserOrganization);

// Terminal Commands
// node src/components/AdminHomeModule/CreateAdmin.mjs
// ctrl c <- once complete