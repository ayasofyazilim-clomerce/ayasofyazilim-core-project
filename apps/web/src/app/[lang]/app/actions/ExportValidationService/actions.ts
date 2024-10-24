"use server";
import type {
  GetApiExportValidationServiceExportValidationData,
  PostApiExportValidationServiceExportValidationData,
  PutApiExportValidationServiceExportValidationByIdData,
} from "@ayasofyazilim/saas/ExportValidationService";
import { structuredError } from "src/lib";
import { getApiRequests } from "../api-requests";

export async function getExportValidationApi(
  data: GetApiExportValidationServiceExportValidationData = {},
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests["export-validation"].get(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function getExportValidationDetailApi(id: string) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: await requests["export-validation"].getDetail(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function postExportValidationApi(
  data: PostApiExportValidationServiceExportValidationData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: requests["export-validation"].post(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function putExportValidationApi(
  data: PutApiExportValidationServiceExportValidationByIdData,
) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: requests["export-validation"].put(data),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
export async function deleteExportValidationApi(id: string) {
  try {
    const requests = await getApiRequests();
    return {
      type: "success",
      data: requests["export-validation"].deleteRow(id),
      status: 200,
      message: "",
    };
  } catch (error) {
    return structuredError(error);
  }
}
