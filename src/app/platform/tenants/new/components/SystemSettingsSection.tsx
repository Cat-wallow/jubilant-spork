import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormContext } from 'react-hook-form';
import { NewTenantFormValues } from '../page';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function SystemSettingsSection() {
  const { control } = useFormContext<NewTenantFormValues>();

  return (
    <Card className="p-6">
      <h2 className="mb-2 text-xl font-semibold">Pengaturan Sistem</h2>

      <div className="space-y-6">
        {/* Row 1: Timezone, Language, Currency */}
        <div className="grid gap-4 md:grid-row-3">
          <FormField
            control={control}
            name="timezone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time zone</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih timezone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Asia/Jakarta (WIB)">Asia/Jakarta (WIB)</SelectItem>
                    <SelectItem value="Asia/Surabaya (WITA)">Asia/Surabaya (WITA)</SelectItem>
                    <SelectItem value="Asia/Makassar (WITA)">Asia/Makassar (WITA)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bahasa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih bahasa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Indonesia">Indonesia</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mata Uang</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih mata uang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Rupiah (IDR)">Rupiah (IDR)</SelectItem>
                    <SelectItem value="Dollar (USD)">Dollar (USD)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </Card>
  );
}
