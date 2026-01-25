import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Terms() {
  return (
    <Dialog>
      <DialogTrigger 
      >
    <h1 className="cursor-pointer  underline underline-offset-2">Terms.</h1>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
           Terms & Conditions
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription 
            render={
                <div className="px-6 py-4">
      <div className="space-y-4 [&_strong]:font-semibold [&_strong]:text-foreground">
        <div className="space-y-4">

          <div className="space-y-1">
            <p><strong>Acceptance of Terms</strong></p>
            <p>
              By accessing or using this platform, you acknowledge that you have read,
              understood, and agree to be bound by these Terms of Service. If you do not
              agree, you must discontinue use of the platform immediately.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>Description of Service</strong></p>
            <p>
              The platform allows users to submit a publicly accessible website URL.
              Our AI systems may analyze visual design elements, content structure,
              branding cues, and publicly available data from the provided URL in order
              to generate marketing assets such as posts, banners, and promotional
              content based on user-defined requirements.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>User Rights and Authorization</strong></p>
            <p>
              By submitting a website URL, you confirm that you own the website or have
              the legal right and authorization to use, analyze, and derive content from
              it. You agree not to submit URLs that infringe upon third-party intellectual
              property rights or violate applicable laws.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>AI-Generated Content Disclaimer</strong></p>
            <p>
              All generated content is produced automatically by AI and is provided
              “as is.” The platform does not guarantee accuracy, originality, legal
              compliance, or suitability for any specific marketing purpose. Users are
              solely responsible for reviewing, editing, and validating all generated
              outputs before use.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>Intellectual Property</strong></p>
            <p>
              The platform retains all rights to its software, AI models, and underlying
              technology. Generated outputs may be used by the user for lawful business
              or personal purposes; however, the platform does not transfer ownership
              of any third-party trademarks, designs, or copyrighted materials that may
              be reflected in the output.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>Prohibited Use</strong></p>
            <ul className="list-disc pl-6">
              <li>Submitting websites without proper authorization</li>
              <li>Generating misleading, deceptive, or unlawful marketing material</li>
              <li>Attempting to reverse-engineer or abuse the AI systems</li>
              <li>Using the service to violate advertising, privacy, or IP laws</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p><strong>Limitation of Liability</strong></p>
            <p>
              To the maximum extent permitted by law, the platform shall not be liable
              for any direct, indirect, incidental, consequential, or business losses
              arising from use of the service, including reliance on AI-generated
              marketing content.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>Termination and Suspension</strong></p>
            <p>
              The platform reserves the right to suspend or terminate access at its sole
              discretion if these terms are violated or if use poses legal, technical,
              or reputational risk to the service.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>Modifications to the Service or Terms</strong></p>
            <p>
              We may update these Terms of Service at any time. Continued use of the
              platform following changes constitutes acceptance of the revised terms.
            </p>
          </div>

          <div className="space-y-1">
            <p><strong>Governing Law</strong></p>
            <p>
              These terms shall be governed and interpreted in accordance with the laws
              of the jurisdiction in which the platform operates, without regard to
              conflict of law principles.
            </p>
          </div>

        </div>
      </div>
    </div>
            }/>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
