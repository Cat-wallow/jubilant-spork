import { Card } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import { FileUploader } from '@/components/shared/FileUploader';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface BrandingSectionProps {
    existingLogoUrl?: string | null;
    onRemoveLogo?: () => void;
}

export default function BrandingSection({ existingLogoUrl, onRemoveLogo }: BrandingSectionProps) {
  const { control } = useFormContext(); // Use context

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Branding</h2>
      <div className="space-y-4">
        <FormField
          control={control}
          name="logo"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Logo Perusahaan</FormLabel>
              <FormControl>
                <FileUploader
                  aspectRatio={1}
                  value={value ? [value] : null}
                  onValueChange={(files) => onChange(files ? files[0] : null)}
                  existingFileUrl={existingLogoUrl}
                  onRemoveExisting={onRemoveLogo}
                  dropzoneOptions={{
                    accept: {
                      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg'],
                    },
                    multiple: false,
                  }}
                  texts={{
                    title: 'Drag & drop logo here, or click to select file',
                    fileTypes: 'JPG, PNG, GIF, WEBP, SVG up to 5MB',
                    aspectRatioError: 'Logo must be square',
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Card>
  );
}
