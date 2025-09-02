"use client";
import type {Volo_Abp_AuditLogging_AuditLogDto} from "@ayasofyazilim/core-saas/AdministrationService";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import {Badge} from "@/components/ui/badge";
import {ChevronDown, ChevronUp} from "lucide-react";
import {useState} from "react";
import type {AdministrationServiceResource} from "src/language-data/core/AdministrationService";

export default function AuditDetail({
  auditData,
  languageData,
}: {
  auditData: Volo_Abp_AuditLogging_AuditLogDto;
  languageData: AdministrationServiceResource;
}) {
  const [expandedActions, setExpandedActions] = useState<Record<number, boolean>>({});

  const toggleAction = (index: number) => {
    setExpandedActions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleString();
  };

  const getStatusBadgeClass = (statusCode?: number) => {
    if (!statusCode) return "text-gray-500 bg-gray-100 border-gray-500";
    if (statusCode >= 200 && statusCode < 300) return "text-green-500 bg-green-100 border-green-500";
    if (statusCode >= 300 && statusCode < 400) return "text-orange-500 bg-orange-100 border-orange-500";
    if (statusCode >= 400) return "text-red-500 bg-red-100 border-red-500";
    return "text-gray-500 bg-gray-100 border-gray-500";
  };

  const getMethodBadgeClass = (method?: string) => {
    switch (method) {
      case "GET": return "text-blue-500 bg-blue-100 border-blue-500";
      case "POST": return "text-green-500 bg-green-100 border-green-500";
      case "PUT": return "text-orange-500 bg-orange-100 border-orange-500";
      case "DELETE": return "text-red-500 bg-red-100 border-red-500";
      default: return "text-gray-500 bg-gray-100 border-gray-500";
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="actions">
            Actions ({auditData.actions?.length || 0})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall" className="mt-4 space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <strong>HTTP status code:</strong>
              <Badge variant="outline" className={getStatusBadgeClass(auditData.httpStatusCode)}>
                {auditData.httpStatusCode}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              <strong>HTTP method:</strong>
              <Badge variant="outline" className={getMethodBadgeClass(auditData.httpMethod)}>
                {auditData.httpMethod}
              </Badge>
            </div>
            
            <div>
              <strong>URL:</strong>
              <div className="mt-1 p-2 bg-gray-50 rounded border break-all text-sm">
                {auditData.url}
              </div>
            </div>
            
            <div>
              <strong>Client IP Address:</strong> {auditData.clientIpAddress}
            </div>
            
            <div>
              <strong>Client Name:</strong> {auditData.clientName || "-"}
            </div>
            
            {auditData.exceptions && (
              <div>
                <strong>Exceptions:</strong>
                <div className="mt-1 p-2 bg-red-50 rounded border text-sm">
                  {auditData.exceptions}
                </div>
              </div>
            )}
            
            <div>
              <strong>User name:</strong> {auditData.userName || "-"}
            </div>
            
            <div>
              <strong>Time:</strong> {formatDate(auditData.executionTime)}
            </div>
            
            <div>
              <strong>Duration:</strong> {auditData.executionDuration}
            </div>
            
            <div>
              <strong>Browser Info:</strong> {auditData.browserInfo || "-"}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="actions" className="mt-4">
          <div className="space-y-2">
            {auditData.actions?.map((action, index) => (
              <Collapsible
                key={index}
                open={expandedActions[index]}
                onOpenChange={() => toggleAction(index)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-blue-600 p-3 text-left text-white hover:bg-blue-700">
                  <span className="font-medium">
                    {action.serviceName} - {action.methodName}
                  </span>
                  {expandedActions[index] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 rounded-lg border p-4">
                  <div className="space-y-3">
                    <div>
                      <strong>Duration:</strong> {action.executionDuration} ms
                    </div>
                    
                    {action.parameters && (
                      <div>
                        <strong>Parameters:</strong>
                        <div className="mt-1 rounded bg-gray-50 p-3">
                          <pre className="whitespace-pre-wrap text-sm">
                            {JSON.stringify(JSON.parse(action.parameters), null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )) || (
              <div className="text-center text-gray-500 py-8">
                No actions available
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}