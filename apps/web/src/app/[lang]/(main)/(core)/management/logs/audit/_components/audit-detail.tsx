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
    <div className="w-full max-w-5xl mx-auto">
      <Tabs defaultValue="overall" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="actions">
            Actions ({auditData.actions?.length || 0})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall" className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
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
                <strong>Client IP Address:</strong>
                <div className="mt-1 text-sm text-gray-700">
                  {auditData.clientIpAddress || "-"}
                </div>
              </div>
              
              <div>
                <strong>Client Name:</strong>
                <div className="mt-1 text-sm text-gray-700">
                  {auditData.clientName || "-"}
                </div>
              </div>
              
              <div>
                <strong>User name:</strong>
                <div className="mt-1 text-sm text-gray-700">
                  {auditData.userName || "-"}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <strong>Time:</strong>
                <div className="mt-1 text-sm text-gray-700">
                  {formatDate(auditData.executionTime)}
                </div>
              </div>
              
              <div>
                <strong>Duration:</strong>
                <div className="mt-1 text-sm text-gray-700">
                  {auditData.executionDuration} ms
                </div>
              </div>
              
              <div>
                <strong>Browser Info:</strong>
                <div className="mt-1 text-sm text-gray-700 break-all">
                  {auditData.browserInfo || "-"}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <strong>URL:</strong>
            <div className="mt-2 p-3 bg-gray-50 rounded border break-all text-sm font-mono">
              {auditData.url}
            </div>
          </div>
          
          {auditData.exceptions && (
            <div className="mt-6">
              <strong className="text-red-600">Exceptions:</strong>
              <div className="mt-2 p-3 bg-red-50 rounded border text-sm">
                {auditData.exceptions}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="actions" className="mt-6">
          <div className="space-y-3">
            {auditData.actions?.map((action, index) => (
              <Collapsible
                key={index}
                open={expandedActions[index]}
                onOpenChange={() => toggleAction(index)}
              >
                <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-blue-600 p-4 text-left text-white hover:bg-blue-700 transition-colors">
                  <span className="font-medium text-left">
                    {action.serviceName} - {action.methodName}
                  </span>
                  {expandedActions[index] ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0 ml-2" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-0 rounded-b-lg border border-t-0 p-4 bg-white">
                  <div className="space-y-4">
                    <div>
                      <strong>Duration:</strong>
                      <span className="ml-2 text-sm text-gray-700">{action.executionDuration} ms</span>
                    </div>
                    
                    {action.parameters && (
                      <div>
                        <strong>Parameters:</strong>
                        <div className="mt-2 rounded bg-gray-50 p-4 border">
                          <pre className="whitespace-pre-wrap text-sm overflow-x-auto">
                            {(() => {
                              try {
                                const parsed = JSON.parse(action.parameters);
                                return JSON.stringify(parsed, null, 2);
                              } catch {
                                return action.parameters;
                              }
                            })()}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )) || (
              <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <div className="text-lg font-medium">No actions available</div>
                <div className="text-sm mt-1">This audit log does not contain any action details.</div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}