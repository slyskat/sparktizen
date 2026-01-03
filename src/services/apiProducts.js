import supabase from './supabase';

export async function getProducts() {
  let { data, error } = await supabase.from('products').select('*');

  if (error) {
    console.error(error);
    throw new Error('Products could not be fetched');
  }

  return data;
}

export function getOptimizedImageUrl(url, width = 500) {
  if (!url) return '';

  if (url.includes('/render/image')) {
    return `${url}&width=${width}`;
  }

  const transformedUrl = url.replace(
    '/object/public/',
    '/render/image/public/'
  );
  return `${transformedUrl}?width=${width}&resize=contain&quality=80`;
}
