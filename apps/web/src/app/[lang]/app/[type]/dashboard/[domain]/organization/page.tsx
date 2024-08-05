"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  $Volo_Abp_Identity_OrganizationUnitCreateDto,
  $Volo_Abp_Identity_OrganizationUnitUpdateDto,
} from "@ayasofyazilim/saas/IdentityService";
import Button from "@repo/ayasofyazilim-ui/molecules/button";
import type { tableAction } from "@repo/ayasofyazilim-ui/molecules/dialog";
import AutoformDialog from "@repo/ayasofyazilim-ui/molecules/dialog";
import { TreeView } from "@repo/ayasofyazilim-ui/molecules/tree-view";
import { SectionNavbarBase } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { Trash2 } from "lucide-react";
import type { TreeViewElement } from "node_modules/@repo/ayasofyazilim-ui/src/molecules/tree-view/tree-view-api";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";
import { noop } from "@tanstack/react-table";
import { createZodObject, getBaseLink } from "src/utils";
import type { OrganizationUnit, Role, User } from "./action";
import {
  fetchOrganizationUnits,
  fetchRolesForUnit,
  fetchUsersForUnit,
} from "./action";
import { ConfirmDialog, RoleModal, UserModal } from "./form";

function getChildrens(parentId: string, data: OrganizationUnit[]) {
  const childrens: TreeViewElement[] = [];
  data
    .filter((i) => i.parentId === parentId)
    .forEach((i) => {
      const childData: TreeViewElement = {
        id: i.id,
        name: i.displayName,
        children: [],
        isSelectable: true,
      };
      childData.children = getChildrens(i.id, data);
      childrens.push(childData);
    });
  return childrens;
}

export interface FormModifierProps {
  formPositions?: string[];
  excludeList?: string[];
  schema: any;
}

export interface TableDataProps {
  createFormSchema: FormModifierProps;
  editFormSchema: FormModifierProps;
}

const dataConfig: Record<string, TableDataProps> = {
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

const createFormSchema = dataConfig.organization.createFormSchema;
const editFormSchema = dataConfig.organization.editFormSchema;

const App: React.FC = () => {
  const [organizationTreeElements, setOrganizationTreeElements] = useState<
    TreeViewElement[]
  >([]);
  const [organizationUnits, setOrganizationUnits] = useState<
    OrganizationUnit[]
  >([]);
  const [selectedUnitId, setSelectedUnitId] = useState<string | undefined>();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<tableAction | undefined>(undefined);
  const [unitUsers, setUnitUsers] = useState<User[]>([]);
  const [unitRoles, setUnitRoles] = useState<Role[]>([]);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [triggerData, setTriggerData] = useState<
    Record<string, any> | undefined
  >(undefined);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [confirmDialogContent, setConfirmDialogContent] = useState({
    title: "",
    description: "",
    onConfirm: noop,
  });
  const [activeTab, setActiveTab] = useState("Users");

  useEffect(() => {
    void fetchAndUpdateUnits();
  }, []);

  useEffect(() => {
    void fetchUsersAndRoles();
  }, [selectedUnitId]);

  const fetchUsersAndRoles = useCallback(async () => {
    if (!selectedUnitId) return;

    const [users, roles] = await Promise.all([
      fetchUsersForUnit(selectedUnitId),
      fetchRolesForUnit(selectedUnitId),
    ]);
    setUnitUsers(users);
    setUnitRoles(roles);
  }, [selectedUnitId]);

  const fetchAndUpdateUnits = useCallback(async () => {
    const units = await fetchOrganizationUnits();
    const parentUnits = units.filter((i) => !i.parentId);
    const _organizationTreeElements: TreeViewElement[] = [];

    parentUnits.forEach((parent) => {
      const parentData: TreeViewElement = {
        id: parent.id,
        name: parent.displayName,
        children: [],
        isSelectable: true,
      };
      parentData.children = getChildrens(parent.id, units);
      _organizationTreeElements.push(parentData);
    });
    setOrganizationTreeElements(_organizationTreeElements);
    setOrganizationUnits(units);
  }, []);

  const editUnit = useCallback(
    (formData: { displayName: string }, _triggerData: { id: string }) => {
      async function edit() {
        try {
          const response = await fetch(
            getBaseLink(`api/organization/organizationEdit`),
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: _triggerData.id,
                requestBody: { displayName: formData.displayName },
              }),
            },
          );
          if (response.ok) {
            toast.success("Organization unit updated successfully");
            void fetchAndUpdateUnits();
            setTriggerData({});
            setOpen(false);
          } else {
            const errorData = await response.json();
            toast.error(
              errorData.message || "Failed to update organization unit",
            );
          }
        } catch (error) {
          toast.error("An error occurred while updating the organization unit");
        }
      }

      void edit();
    },
    [],
  );

  const handleEditUnitClick = useCallback(() => {
    setAction({
      autoFormArgs: {
        formSchema: createZodObject(
          editFormSchema.schema,
          editFormSchema.formPositions || [],
        ),
      },
      callback: editUnit,
      cta: "Edit Unit",
      description: "Edit the name of the organization unit",
    });
    setTriggerData({
      displayName: organizationUnits.find((i) => i.id === selectedUnitId)
        ?.displayName,
      id: selectedUnitId,
    });
    setOpen(true);
  }, [selectedUnitId]);

  const addNewUnit = useCallback(
    async (
      formData: { displayName: string },
      _triggerData?: { id: string },
    ) => {
      try {
        const response = await fetch(getBaseLink("api/admin/organization"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            displayName: formData.displayName,
            parentId: _triggerData?.id,
          }),
        });

        if (response.ok) {
          toast.success("Organization unit added successfully");
          void fetchAndUpdateUnits();
          setTriggerData({});
          setOpen(false);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to add organization unit");
        }
      } catch (error) {
        toast.error("An error occurred while saving the organization unit");
      }
    },
    [],
  );

  const handleAddUnitClick = useCallback(
    (_selectedUnitId: any) => {
      const selectedUnit = _selectedUnitId
        ? organizationUnits.find((i) => i.id === _selectedUnitId)
        : null;
      setAction({
        autoFormArgs: {
          formSchema: createZodObject(
            createFormSchema.schema,
            createFormSchema.formPositions || [],
          ),
          fieldConfig: { withoutBorder: true },
        },
        callback: (e, _triggerData) => {
          const formData = { ...e, ParentId: selectedUnit?.id };
          void addNewUnit(formData, _triggerData);
          return true;
        },
        cta: "New organization unit",
        description: selectedUnit
          ? `Parent: ${selectedUnit.displayName}`
          : "Create a new organization unit",
      });
      setTriggerData({ id: _selectedUnitId });
      setOpen(true);
    },
    [organizationUnits],
  );

  const handleMoveAllUsersClick = useCallback(() => {
    if (unitUsers.length === 0) {
      toast.warning("There are no users currently in this unit.");
      return;
    }
    const availableUnits = organizationUnits.filter(
      (u) => u.id !== selectedUnitId,
    );
    const unitOptions = availableUnits.map((unit) => {
      const parentUnit = organizationUnits.find((u) => u.id === unit.parentId);
      return {
        id: unit.id,
        displayName: unit.displayName,
        parentName: parentUnit ? parentUnit.displayName : "",
      };
    });
    if (unitOptions.length === 0) {
      toast.error("No other units available to move users.");
      return;
    }
    const selectedUnit = organizationUnits.find((i) => i.id === selectedUnitId);
    const placeholder = "Select a unit";
    const DynamicEnum = z.enum([
      placeholder,
      ...unitOptions.map(
        (u) =>
          `${u.displayName} ${u.parentName ? `Parent: ${u.parentName}` : ""}`,
      ),
    ]);
    setTriggerData({
      displayName: selectedUnit?.displayName,
      id: selectedUnitId,
    });
    setAction({
      autoFormArgs: {
        formSchema: z.object({
          targetUnit: DynamicEnum.default(placeholder),
        }),
        fieldConfig: { withoutBorder: true },
      },
      callback: (e, _triggerData) => {
        const _selectedUnit = unitOptions.find(
          (u) =>
            `${u.displayName} ${
              u.parentName ? `Parent: ${u.parentName}` : ""
            }` === e.targetUnit,
        );
        if (!_selectedUnit) {
          toast.error("Selected unit not found");
          return false;
        }
        const formData = { targetUnitId: _selectedUnit.id };
        void handleMoveUsers(formData, _triggerData);
        return true;
      },
      cta: "Move all Users",
      description: `Move all users from ${selectedUnit?.displayName} to:`,
    });
    setOpen(true);
  }, [selectedUnitId, unitUsers]);

  const handleDeleteUnit = useCallback((unitId: string, unitName: string) => {
    setConfirmDialogContent({
      title: "Are You Sure",
      description: `Are you sure you want to delete the organization unit "${unitName}" ?`,
      onConfirm: () => {
        async function confirm() {
          try {
            const response = await fetch(
              getBaseLink(`api/admin/organization`),
              {
                method: "DELETE",
                body: JSON.stringify(unitId),
              },
            );
            if (response.ok) {
              toast.success("Organization unit deleted successfully");
              void fetchAndUpdateUnits();
              setSelectedUnitId(undefined);
              setTriggerData({});
              setOpen(false);
            } else {
              const errorData = await response.json();
              toast.error(
                errorData.message || "Failed to delete organization unit",
              );
            }
          } catch (error) {
            toast.error(
              "An error occurred while deleting the organization unit",
            );
          }
          setIsConfirmDialogOpen(false);
        }
        void confirm();
      },
    });
    setIsConfirmDialogOpen(true);
  }, []);

  const handleMoveUsers = useCallback(
    async (
      formData: { targetUnitId: string },
      _triggerData: { id: string },
    ) => {
      if (!selectedUnitId) {
        toast.error("Please select a unit");
        return;
      }
      try {
        const targetUnit = organizationUnits.find(
          (unit) => unit.id === formData.targetUnitId,
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
              id: _triggerData.id,
              organizationId: targetUnit.id,
            }),
          },
        );
        if (response.ok) {
          void fetchUsersAndRoles();
          toast.success("Users moved successfully");
          setTriggerData({});
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Failed to move users");
        }
      } catch (error) {
        toast.error("An error occurred while moving the users");
      }
      setOpen(false);
    },
    [selectedUnitId, unitUsers],
  );

  const optionsDropdownContent = useCallback(
    () => (
      <>
        <DropdownMenuItem onClick={handleEditUnitClick}>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleAddUnitClick(selectedUnitId);
          }}
        >
          Add Sub-unit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleMoveAllUsersClick}>
          Move all Users
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleDeleteUnit(
              selectedUnitId ?? "",
              organizationUnits.find((i) => i.id === selectedUnitId)
                ?.displayName ?? "",
            );
          }}
        >
          Delete
        </DropdownMenuItem>
      </>
    ),
    [selectedUnitId, unitUsers],
  );

  const handleAddUsers = useCallback(
    (selectedUsers: User[]) => {
      async function addUser() {
        const selectedUnit = organizationUnits.find(
          (i) => i.id === selectedUnitId,
        );
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
                  requestBody: {
                    userIds: selectedUsers.map((user) => user.id),
                  },
                }),
              },
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
            toast.error("An error occurred while adding the users");
          }
        } else if (selectedUsers.length === 0) {
          toast.error("No users selected");
        }
        setIsUserModalOpen(false);
      }
      void addUser();
    },
    [selectedUnitId],
  );

  const handleAddRoles = useCallback(
    (selectedRoles: Role[]) => {
      async function addRoles() {
        const selectedUnit = organizationUnits.find(
          (i) => i.id === selectedUnitId,
        );
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
                  requestBody: {
                    roleIds: selectedRoles.map((role) => role.id),
                  },
                }),
              },
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
            toast.error("An error occurred while adding the roles");
          }
        } else if (selectedRoles.length === 0) {
          toast.error("No roles selected");
        }
        setIsRoleModalOpen(false);
      }
      void addRoles();
    },
    [selectedUnitId],
  );

  const handleDeleteUser = useCallback(
    (userId: string, userName: string) => {
      const selectedUnit = organizationUnits.find(
        (i) => i.id === selectedUnitId,
      );
      if (selectedUnit) {
        setConfirmDialogContent({
          title: "Are You Sure",
          description: `Are you sure you want to remove the user "${userName}" from organization unit "${selectedUnit.displayName}" ?`,
          onConfirm: () => {
            async function confirm() {
              if (selectedUnit) {
                try {
                  const response = await fetch(
                    getBaseLink(`api/organization/organizationUser`),
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: selectedUnit.id,
                        memberId: userId,
                      }),
                    },
                  );
                  if (response.ok) {
                    toast.success("User deleted successfully");
                    const updatedUsers = await fetchUsersForUnit(
                      selectedUnit.id,
                    );
                    setUnitUsers(updatedUsers);
                  } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || "Failed to delete user");
                  }
                } catch (error) {
                  toast.error("An error occurred while deleting the user");
                }
                setIsConfirmDialogOpen(false);
              }
            }
            void confirm();
          },
        });
        setIsConfirmDialogOpen(true);
      }
    },
    [selectedUnitId],
  );

  const handleDeleteRole = useCallback(
    (roleId: string, roleName: string) => {
      const selectedUnit = organizationUnits.find(
        (i) => i.id === selectedUnitId,
      );
      if (selectedUnit) {
        setConfirmDialogContent({
          title: "Are You Sure",
          description: `Are you sure you want to remove the role "${roleName}" from organization unit "${selectedUnit.displayName}" ?`,
          onConfirm: () => {
            async function confirm() {
              if (selectedUnit) {
                try {
                  const response = await fetch(
                    getBaseLink(`api/organization/organizationRole`),
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ id: selectedUnit.id, roleId }),
                    },
                  );
                  if (response.ok) {
                    toast.success("Role deleted successfully");
                    const updatedRoles = await fetchRolesForUnit(
                      selectedUnit.id,
                    );
                    setUnitRoles(updatedRoles);
                  } else {
                    const errorData = await response.json();
                    toast.error(errorData.message || "Failed to delete role");
                  }
                } catch (error) {
                  toast.error("An error occurred while deleting the role");
                }
                setIsConfirmDialogOpen(false);
              }
            }
            void confirm();
          },
        });
        setIsConfirmDialogOpen(true);
      }
    },
    [selectedUnitId],
  );

  return (
    <>
      <div className="flex flex-row w-full min-h-[50vh]">
        <Card className="m-2 shadow-lg pb-4 w-1/2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl">Organization Tree</h2>
              <Button
                className="bg-primary text-white py-2 px-4 rounded"
                onClick={() => {
                  setSelectedUnitId(undefined);
                  setTriggerData({});
                  handleAddUnitClick(null);
                }}
              >
                + Add root unit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {organizationUnits.length > 0 ? (
              <TreeView
                elements={organizationTreeElements}
                optionsDropdownContent={optionsDropdownContent()}
                selectedId={selectedUnitId}
                setSelectedId={setSelectedUnitId}
              />
            ) : (
              <p>No organization units available</p>
            )}
          </CardContent>
        </Card>
        <Card className="m-2 shadow-lg pb-4 w-1/2">
          <CardContent>
            <SectionNavbarBase
              activeSectionId={activeTab}
              navClassName="p-0"
              navContainerClassName="shadow-none"
              onSectionChange={(newActiveSection) => {
                setActiveTab(newActiveSection);
              }}
              sections={[
                { id: "Users", name: "Users" },
                { id: "Roles", name: "Roles" },
              ]}
              showContentInSamePage
            />
            {selectedUnitId ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex justify-end w-full">
                    {activeTab === "Users" ? (
                      <Button
                        className="bg-primary text-white py-2 px-4 rounded"
                        onClick={() => {
                          setIsUserModalOpen(true);
                        }}
                      >
                        + Add user
                      </Button>
                    ) : (
                      <Button
                        className="bg-primary text-white py-2 px-4 rounded"
                        onClick={() => {
                          setIsRoleModalOpen(true);
                        }}
                      >
                        + Add role
                      </Button>
                    )}
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      {activeTab === "Users" ? (
                        <>
                          <TableHead>User Name</TableHead>
                          <TableHead>Email Address</TableHead>
                        </>
                      ) : (
                        <TableHead>Role Name</TableHead>
                      )}
                      <TableHead className="text-right" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeTab === "Users" && unitUsers.length > 0
                      ? unitUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                onClick={() => {
                                  handleDeleteUser(user.id, user.userName);
                                }}
                                variant="link"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      : activeTab === "Users" && (
                          <TableRow>
                            <TableCell>No data available</TableCell>
                          </TableRow>
                        )}
                    {activeTab === "Roles" && unitRoles.length > 0
                      ? unitRoles.map((role) => (
                          <TableRow key={role.id}>
                            <TableCell>{role.name}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                onClick={() => {
                                  handleDeleteRole(role.id, role.name);
                                }}
                                variant="link"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      : activeTab === "Roles" && (
                          <TableRow>
                            <TableCell>No data available</TableCell>
                          </TableRow>
                        )}
                  </TableBody>
                </Table>
                <p className="text-sm mt-10">
                  {activeTab === "Users" ? unitUsers.length : unitRoles.length}{" "}
                  total
                </p>
              </div>
            ) : (
              <p>Select an organization unit to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
      {open ? (
        <AutoformDialog
          action={action}
          onOpenChange={setOpen}
          open={open}
          triggerData={triggerData}
        />
      ) : null}
      <ConfirmDialog
        description={confirmDialogContent.description}
        isOpen={isConfirmDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(false);
        }}
        onConfirm={confirmDialogContent.onConfirm}
        title={confirmDialogContent.title}
      />
      <UserModal
        addedItems={unitUsers}
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false);
        }}
        onSave={handleAddUsers}
      />
      <RoleModal
        addedItems={unitRoles}
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
        }}
        onSave={handleAddRoles}
      />
    </>
  );
};

export default App;
