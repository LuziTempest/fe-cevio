import MinimalTheme from "@/templates/MinimalTheme/page";
import ProfessionalTheme from "@/templates/ProfessionalTheme/page";
import CreativeTheme from "@/templates/CreativeTheme/page";
import { dummyData } from "@/data/dummy";

export default function SandboxPage() {
    return (
        <div>
            <ProfessionalTheme data={dummyData} />
        </div>
    );
}