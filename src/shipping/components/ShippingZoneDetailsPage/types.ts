import { MetadataFormData } from '@dashboard/components/Metadata';

export interface ShippingZoneUpdateFormData extends MetadataFormData {
  name: string;
  description: string;
  warehouses: string[];
  channels: string[];
}
