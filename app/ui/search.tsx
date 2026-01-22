'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // console.log(term);
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) { params.set('query', term) }
    else { params.delete('term') };
    replace(`${pathname}?${params.toString()}`); // updates the URL with the user's search data    
  }, 300);

  // function handleSearch(term: string) {
  //   // console.log(term);
  //   console.log(`Searching... ${term}`);
  //   const params = new URLSearchParams(searchParams);

  //   if (term) { params.set('query', term) }
  //   else { params.delete('term') };
  //   replace(`${pathname}?${params.toString()}`); // updates the URL with the user's search data    
  // }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { handleSearch(e.target.value); }}
        // defaultValue vs. value / Controlled vs. Uncontrolled
        // If you're using state to manage the value of an input, you'd use the value attribute to make it a controlled component. This means React would manage the input's state.
        // However, since you're not using state, you can use defaultValue. This means the native input will manage its own state. This is okay since you're saving the search query to the URL instead of state.
        defaultValue={searchParams.get('query')?.toString()} // To ensure the input field is in sync with the URL and will be populated when sharing
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
