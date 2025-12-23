'use client';

import { Check } from 'lucide-react';

interface ComponentItem {
  title: string;
  items: string[];
}

interface DeliverableItem {
  service: string;
  description: string;
  color: string;
}

interface DeliverableSection {
  title: string;
  items: DeliverableItem[];
}

interface Template {
  title: string;
  components: ComponentItem;
  deliverables: DeliverableSection;
}

interface TemplateSectionProps {
  template: Template;
}

export function TemplateSection({ template }: TemplateSectionProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-base font-bold text-gray-900">{template.title}</h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Komponen BAST Standar */}
        <div>
          <h3 className="mb-4 text-base font-normal text-gray-900">
            {template.components.title}
          </h3>
          <ul className="space-y-3">
            {template.components.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                <span className="text-sm font-normal text-gray-900">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverable per Layanan */}
        <div>
          <h3 className="mb-4 text-base font-normal text-gray-900">
            {template.deliverables.title}
          </h3>
          <div className="space-y-4">
            {template.deliverables.items.map((item, index) => (
              <div key={index}>
                <p className={`text-sm font-normal ${item.color}`}>{item.service}</p>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
