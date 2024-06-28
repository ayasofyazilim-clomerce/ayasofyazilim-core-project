"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import AutoformDialog, {
  tableAction,
} from "@repo/ayasofyazilim-ui/molecules/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createZodObject, getBaseLink } from "src/utils";
import {
  fetchOrganizationUnits,
  fetchRolesForUnit,
  fetchUsersForUnit,
  OrganizationUnit,
  Role,
  User,
} from "./action";
import { ConfirmDialog, RoleModal, UserModal } from "./form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { z } from "zod";
import {
  $Volo_Abp_Identity_OrganizationUnitCreateDto,
  $Volo_Abp_Identity_OrganizationUnitUpdateDto,
} from "@ayasofyazilim/saas/IdentityService";

export type formModifier = {
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
};

export type tableData = {
  createFormSchema: formModifier;
  editFormSchema: formModifier;
};

const dataConfig: Record<string, tableData> = {
  organization: {
    createFormSchema: {
      formPositions: ["displayName"],
      schema: $Volo_Abp_Identity_OrganizationUnitCreateDto,
    },
    editFormSchema: {
      formPositions: ["displayName"],
      schema: $Volo_Abp_Identity_OrganizationUnitUpdateDto,
    },
  },
};

const App: React.FC = () => {
  const [organizationUnits, setOrganizationUnits] = useState<
    OrganizationUnit[]
  >([]);
  const [selectedUnit, setSelectedUnit] = useState<OrganizationUnit | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"Users" | "Roles">("Users");
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [unitUsers, setUnitUsers] = useState<User[]>([]);
  const [unitRoles, setUnitRoles] = useState<Role[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogContent, setConfirmDialogContent] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
  });
  const [DisplayNameEnum, setDisplayNameEnum] = useState<any>();
  const [currentUnitName, setCurrentUnitName] = useState<string>("");
  const [action, setAction] = useState<tableAction | undefined>(undefined);
  const [triggerData, setTriggerData] = useState<Record<string, any> | undefined>(undefined);

  useEffect(() => {
    const loadData = async () => {
      const units = await fetchOrganizationUnits();
      setOrganizationUnits(units);

      const unitNames = units.map((unit) => unit.displayName);
      if (unitNames.length > 0) {
        const DynamicEnum = z.enum([unitNames[0], ...unitNames.slice(1)]);
        setDisplayNameEnum(DynamicEnum);
      }
    };

    loadData();
  }, []);

  const updateEnums = (units: OrganizationUnit[]) => {
    const unitNames = units.map((unit) => unit.displayName);
    if (unitNames.length > 0) {
      const DynamicEnum = z.enum([unitNames[0], ...unitNames.slice(1)]);
      setDisplayNameEnum(DynamicEnum);
    }
  };

  const handleAddUsers = async (selectedUsers: User[]) => {
    if (selectedUnit && selectedUsers.length > 0) {
      try {
        const response = await fetch(
          getBaseLink(`api/organization/organizationUser`),
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: selectedUnit.id,
              requestBody: { userIds: selectedUsers.map((user) => user.id) },
            }),
          }
        );
        if (response.ok) {
          toast.success("Users added successfully");
          const updatedUsers = await fetchUsersForUnit(selectedUnit.id);
          setUnitUsers(updatedUsers);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to add users");
        }
      } catch (error) {
        console.error("Error adding users:", error);
        toast.error("An error occurred while adding the users");
      }
    } else if (selectedUsers.length === 0) {
      toast.error("No users selected");
    }
    setIsUserModalOpen(false);
  };

  const handleAddRoles = async (selectedRoles: Role[]) => {
    if (selectedUnit && selectedRoles.length > 0) {
      try {
        const response = await fetch(
          getBaseLink(`api/organization/organizationRole`),
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: selectedUnit.id,
              requestBody: { roleIds: selectedRoles.map((role) => role.id) },
            }),
          }
        );
        if (response.ok) {
          toast.success("Roles added successfully");
          const updatedRoles = await fetchRolesForUnit(selectedUnit.id);
          setUnitRoles(updatedRoles);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to add roles");
        }
      } catch (error) {
        console.error("Error adding roles:", error);
        toast.error("An error occurred while adding the roles");
      }
    } else if (selectedRoles.length === 0) {
      toast.error("No roles selected");
    }
    setIsRoleModalOpen(false);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (selectedUnit) {
      setConfirmDialogContent({
        title: "Are You Sure",
        description: `Are you sure you want to remove the user "${userName}" from organization unit "${selectedUnit.displayName}" ?`,
        onConfirm: async () => {
          try {
            const response = await fetch(
              getBaseLink(`api/organization/organizationUser`),
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedUnit.id, memberId: userId }),
              }
            );
            if (response.ok) {
              toast.success("User deleted successfully");
              const updatedUsers = await fetchUsersForUnit(selectedUnit.id);
              setUnitUsers(updatedUsers);
            } else {
              const errorData = await response.json();
              toast.error(errorData.message || "Failed to delete user");
            }
          } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("An error occurred while deleting the user");
          }
          setIsConfirmDialogOpen(false);
        },
      });
      setIsConfirmDialogOpen(true);
    }
  };

  const handleDeleteRole = (roleId: string, roleName: string) => {
    if (selectedUnit) {
      setConfirmDialogContent({
        title: "Are You Sure",
        description: `Are you sure you want to remove the role "${roleName}" from organization unit "${selectedUnit.displayName}" ?`,
        onConfirm: async () => {
          try {
            const response = await fetch(
              getBaseLink(`api/organization/organizationRole`),
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedUnit.id, roleId: roleId }),
              }
            );
            if (response.ok) {
              toast.success("Role deleted successfully");
              const updatedRoles = await fetchRolesForUnit(selectedUnit.id);
              setUnitRoles(updatedRoles);
            } else {
              const errorData = await response.json();
              toast.error(errorData.message || "Failed to delete role");
            }
          } catch (error) {
            console.error("Error deleting role:", error);
            toast.error("An error occurred while deleting the role");
          }
          setIsConfirmDialogOpen(false);
        },
      });
      setIsConfirmDialogOpen(true);
    }
  };

  const handleSave = async (formData: { displayName: string }) => {
    try {
      const response = await fetch(getBaseLink("api/admin/organization"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Organization unit added successfully");
        const units = await fetchOrganizationUnits();
        setOrganizationUnits(units);
        updateEnums(units);
        setOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to add organization unit");
      }
    } catch (error) {
      console.error("Error saving organization unit:", error);
      toast.error("An error occurred while saving the organization unit");
    }
  };

  const handleDeleteUnit = async (unitId: string, unitName: string) => {
    setConfirmDialogContent({
      title: "Are You Sure",
      description: `Are you sure you want to delete the organization unit "${unitName}" ?`,
      onConfirm: async () => {
        try {
          const response = await fetch(getBaseLink(`api/admin/organization`), {
            method: "DELETE",
            body: JSON.stringify(unitId),
          });
          if (response.ok) {
            toast.success("Organization unit deleted successfully");
            const units = await fetchOrganizationUnits();
            setOrganizationUnits(units);
            updateEnums(units);
            if (selectedUnit && selectedUnit.id === unitId) {
              setSelectedUnit(null);
              setUnitUsers([]);
              setUnitRoles([]);
            }
          } else {
            const errorData = await response.json();
            toast.error(
              errorData.message || "Failed to delete organization unit"
            );
          }
        } catch (error) {
          console.error("Error deleting organization unit:", error);
          toast.error("An error occurred while deleting the organization unit");
        }
        setIsConfirmDialogOpen(false);
      },
    });
    setIsConfirmDialogOpen(true);
  };

  const handleUpdateUnit = async (formData: { displayName: string }) => {
    try {
      const response = await fetch(
        getBaseLink(`api/organization/organizationEdit`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: selectedUnit?.id,
            requestBody: { displayName: formData.displayName },
          }),
        }
      );
      if (response.ok) {
        toast.success("Organization unit updated successfully");
        const units = await fetchOrganizationUnits();
        setOrganizationUnits(units);
        updateEnums(units);
        if (selectedUnit && selectedUnit.id === selectedUnit.id) {
          setSelectedUnit((prevUnit) =>
            prevUnit ? { ...prevUnit, displayName: formData.displayName } : null
          );
        }
        setOpen(false);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update organization unit");
      }
    } catch (error) {
      console.error("Error updating organization unit:", error);
      toast.error("An error occurred while updating the organization unit");
    }
  };

  const handleMoveUsers = async (formData: { displayName: string }) => {
    if (selectedUnit) {
      try {
        const targetUnit = organizationUnits.find(
          (unit) => unit.displayName === formData.displayName
        );
        if (!targetUnit) {
          toast.error("Target unit not found");
          return;
        }
        const response = await fetch(
          getBaseLink(`api/organization/MoveAllUsers`),
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: selectedUnit.id,
              organizationId: targetUnit.id,
            }),
          }
        );
        if (response.ok) {
          toast.success("Users moved successfully");
          const updatedUsers = await fetchUsersForUnit(selectedUnit.id);
          setUnitUsers(updatedUsers);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to move users");
        }
      } catch (error) {
        console.error("Error moving users:", error);
        toast.error("An error occurred while moving the users");
      }
      setOpen(false);
    }
  };

  const handleToggleForm = () => {
    setSelectedUnit(null);
    setAction(createAction);
    setOpen(true);
  };

  const handleUnitClick = async (unit: OrganizationUnit) => {
    setSelectedUnit(unit);
    setActiveTab("Users");
    const [users, roles] = await Promise.all([
      fetchUsersForUnit(unit.id),
      fetchRolesForUnit(unit.id),
    ]);
    setUnitUsers(users);
    setUnitRoles(roles);
  };

  const handleSubUnit = async (unit: OrganizationUnit) => {
    await handleUnitClick(unit);
    setAction(addSubUnitAction);
    setOpen(true);
  };

  const handleEditUnit = async (unit: OrganizationUnit) => {
    await handleUnitClick(unit);
    setAction(editAction);
    setTriggerData({ displayName: "ttt" });
    setOpen(true);
  };

  const handleListAllUnits = async (unit: OrganizationUnit) => {
    setSelectedUnit(unit);
    setActiveTab("Users");
    const [users, roles] = await Promise.all([
      fetchUsersForUnit(unit.id),
      fetchRolesForUnit(unit.id),
    ]);
    setUnitUsers(users);
    setUnitRoles(roles);
    if (users.length === 0) {
      toast.warning("There are no users currently in this unit.");
      return;
    }
    const filteredUnits = organizationUnits.filter((u) => u.id !== unit.id);
    const unitNames = filteredUnits.map((u) => u.displayName);
    if (unitNames.length > 0) {
      const DynamicEnum = z.enum([unitNames[0], ...unitNames.slice(1)]);
      setDisplayNameEnum(DynamicEnum);
    }
    setAction(moveAllUserAction);
    setOpen(true);
  };

  const createFormSchema = dataConfig.organization.createFormSchema;
  const editFormSchema = dataConfig.organization.editFormSchema;

  const createAction: tableAction = {
    autoFormArgs: {
      formSchema: createZodObject(
        createFormSchema.schema,
        createFormSchema.formPositions || []
      ),
    },
    callback: (e) => {
      const formData = { ...e };
      handleSave(formData);
      return true;
    },
    cta: "New organization unit",
    description: "Create a new organization unit",
  };

  const editAction: tableAction = {
    autoFormArgs: {
      formSchema: createZodObject(
        editFormSchema.schema,
        editFormSchema.formPositions || []
      ),
    },
    callback: handleUpdateUnit,
    cta: "Edit Unit",
    description: "Edit the name of the organization unit",
  };

  const moveAllUserAction: tableAction = {
    autoFormArgs: {
      formSchema: z.object({
        displayName: DisplayNameEnum,
      }),
    },
    callback: handleMoveUsers,
    cta: "Move all Users",
    description: `Move all users with ${currentUnitName} organization unit to:`,
  };

  const addSubUnitAction: tableAction = {
    autoFormArgs: {
      formSchema: createZodObject(
        createFormSchema.schema,
        createFormSchema.formPositions || []
      ),
    },
    callback: (e) => {
      const formData = { ...e, ParentId: selectedUnit?.id };
      handleSave(formData);
      return true;
    },
    cta: "New organization unit",
    description: `Parent: ${selectedUnit?.displayName}`,
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50 items-center overflow-auto">
      <div className="flex w-full max-w-7xl">
        <Card className="w-1/2 m-2 shadow-lg pb-4 overflow-auto max-h-[80vh]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Organization Tree</h2>
              <Button
                onClick={handleToggleForm}
                className="bg-primary text-white py-2 px-4 rounded"
              >
                + Add root unit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {organizationUnits.length > 0 ? (
              <div className="overflow-auto max-h-[60vh] ">
                <Table>
                  <TableBody>
                    {organizationUnits.map((unit) => (
                      <TableRow key={unit.code}>
                        <TableCell className="border-b py-2">
                          <Button
                            className={`w-full text-left bg-transparent text-gray-700 p-o ${selectedUnit && selectedUnit.id === unit.id ? "text-white bg-primary" : "text-gray-700"}`}
                            onClick={() => handleUnitClick(unit)}
                          >
                            <h6 className="text-center w-full">
                              {unit.displayName}
                            </h6>
                          </Button>
                        </TableCell>
                        <TableCell className="border-b px-4 py-2 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                className={`w-full text-left bg-transparent text-gray-700 p-o ${selectedUnit && selectedUnit.id === unit.id ? "text-white bg-primary" : "text-gray-700"}`}
                              >
                                ...
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="left-0">
                              <DropdownMenuItem
                                onClick={() => handleEditUnit(unit)}
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleSubUnit(unit)}
                              >
                                Add Sub-unit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleListAllUnits(unit)}
                              >
                                Move all Users
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteUnit(unit.id, unit.displayName)
                                }
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p></p>
            )}
          </CardContent>
        </Card>

        <Card className="w-1/2 m-2 shadow-lg pb-4 overflow-auto max-h-[80vh]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  className={`text-sm bg-transparent ${activeTab === "Users" ? "text-white bg-primary" : "text-gray-700"}`}
                  onClick={() => setActiveTab("Users")}
                >
                  Users ({unitUsers.length})
                </Button>
                <Button
                  className={`text-sm bg-transparent ${activeTab === "Roles" ? "text-white bg-primary" : "text-gray-700"}`}
                  onClick={() => setActiveTab("Roles")}
                >
                  Roles ({unitRoles.length})
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedUnit ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm">{selectedUnit.displayName}</h3>
                  {activeTab === "Users" ? (
                    <Button
                      onClick={() => setIsUserModalOpen(true)}
                      className="bg-primary text-white py-2 px-4 rounded"
                    >
                      + Add user
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setIsRoleModalOpen(true)}
                      className="bg-primary text-white py-2 px-4 rounded"
                    >
                      + Add role
                    </Button>
                  )}
                </div>
                {activeTab === "Users" ? (
                  <div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead></TableHead>
                          <TableHead>User Name</TableHead>
                          <TableHead>Email Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {unitUsers.length > 0 ? (
                          unitUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <Button
                                  className="bg-primary text-white"
                                  onClick={() =>
                                    handleDeleteUser(user.id, user.userName)
                                  }
                                >
                                  Delete
                                </Button>
                              </TableCell>
                              <TableCell>{user.userName}</TableCell>
                              <TableCell>{user.email}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell>No data available</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                    <p className="text-sm mt-10">{unitUsers.length} total</p>
                  </div>
                ) : (
                  <div>
                    <div className="overflow-auto max-h-80">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Role Name</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {unitRoles.length > 0 ? (
                            unitRoles.map((role) => (
                              <TableRow key={role.id}>
                                <TableCell>
                                  <Button
                                    className="bg-primary text-white"
                                    onClick={() =>
                                      handleDeleteRole(role.id, role.name)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                                <TableCell>{role.name}</TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell>No data available</TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                    <p className="text-sm mt-10">{unitRoles.length} total</p>
                  </div>
                )}
              </div>
            ) : (
              <p>Select an organization unit to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
      <AutoformDialog
        open={open}
        onOpenChange={setOpen}
        action={action}
        triggerData={triggerData}
      />
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleAddUsers}
        addedItems={unitUsers}
      />
      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSave={handleAddRoles}
        addedItems={unitRoles}
      />
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={confirmDialogContent.onConfirm}
        title={confirmDialogContent.title}
        description={confirmDialogContent.description}
      />
    </div>
  );
};

export default App;
