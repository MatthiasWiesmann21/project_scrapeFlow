import { ExecutionEnvironment } from "@/types/executor";
import { ReadPropertyFromJsonTask } from "../task/ReadPropertyFromJson";

export async function ReadPropertyFromJsonExecutor(
  environment: ExecutionEnvironment<typeof ReadPropertyFromJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("Input->JSON not defined")
    }
    
    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("Input->propertyName not defined")
    }

    const json = JSON.parse(jsonData);
    const propertyValue = json[propertyName];

    if (propertyValue === undefined) {
      environment.log.error("Property not found");
      return false;
    }

    environment.setOutput("Property value", propertyValue);
    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
