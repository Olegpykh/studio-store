'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { shopifyFetch } from '@/lib/shopify';
import {
  CREATE_CUSTOMER_ADDRESS_MUTATION,
  UPDATE_CUSTOMER_ADDRESS_MUTATION,
  DELETE_CUSTOMER_ADDRESS_MUTATION,
} from '@/lib/shopify-queries';

interface AddressMutationResponse {
  customerAddressCreate?: {
    customerAddress: { id: string } | null;
    customerUserErrors: { field: string[]; message: string }[];
  };
  customerAddressUpdate?: {
    customerAddress: { id: string } | null;
    customerUserErrors: { field: string[]; message: string }[];
  };
}

interface DeleteAddressResponse {
  customerAddressDelete: {
    deletedCustomerAddressId: string | null;
    customerUserErrors: { field: string[]; message: string }[];
  };
}

function extractAddressFromForm(formData: FormData) {
  return {
    firstName: formData.get('firstName')?.toString() || '',
    lastName: formData.get('lastName')?.toString() || '',
    address1: formData.get('address1')?.toString() || '',
    address2: formData.get('address2')?.toString() || '',
    city: formData.get('city')?.toString() || '',
    zip: formData.get('zip')?.toString() || '',
    country: formData.get('country')?.toString() || '',
    phone: formData.get('phone')?.toString() || '',
  };
}

export async function createAddressAction(
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const data = await shopifyFetch<AddressMutationResponse>(
      CREATE_CUSTOMER_ADDRESS_MUTATION,
      {
        customerAccessToken: token,
        address: extractAddressFromForm(formData),
      }
    );

    const errors = data?.customerAddressCreate?.customerUserErrors;
    if (errors && errors.length > 0) {
      return { error: errors[0].message };
    }

    if (!data?.customerAddressCreate?.customerAddress) {
      return { error: 'Failed to create address. Please try again.' };
    }
  } catch (err) {
    console.error('❌ Error creating address:', err);
    return { error: 'Something went wrong. Please try again.' };
  }

  revalidatePath('/account');
  redirect('/account');
}

export async function updateAddressAction(
  addressId: string,
  _prevState: { error: string | null },
  formData: FormData
): Promise<{ error: string | null }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const data = await shopifyFetch<AddressMutationResponse>(
      UPDATE_CUSTOMER_ADDRESS_MUTATION,
      {
        customerAccessToken: token,
        id: addressId,
        address: extractAddressFromForm(formData),
      }
    );

    const errors = data?.customerAddressUpdate?.customerUserErrors;
    if (errors && errors.length > 0) {
      return { error: errors[0].message };
    }

    if (!data?.customerAddressUpdate?.customerAddress) {
      return { error: 'Failed to update address. Please try again.' };
    }
  } catch (err) {
    console.error('❌ Error updating address:', err);
    return { error: 'Something went wrong. Please try again.' };
  }

  revalidatePath('/account');
  redirect('/account');
}

export async function deleteAddressAction(addressId: string): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const data = await shopifyFetch<DeleteAddressResponse>(
      DELETE_CUSTOMER_ADDRESS_MUTATION,
      {
        customerAccessToken: token,
        id: addressId,
      }
    );

    const errors = data?.customerAddressDelete?.customerUserErrors;
    if (errors && errors.length > 0) {
      console.error('❌ Error deleting address:', errors[0].message);
    }
  } catch (err) {
    console.error('❌ Error deleting address:', err);
  }

  revalidatePath('/account');
}
