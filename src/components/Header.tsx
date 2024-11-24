import Link from 'next/link';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Studio', href: '/studio' },
  { name: 'Agency', href: '/agency' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  return (
    <>
      <div className="h-20"></div>
      <Disclosure as="nav" className="bg-white/90 backdrop-blur-md shadow-lg fixed w-full top-0 z-50">
        {({ open }) => (
          <>
            <div className="container">
              <div className="relative flex h-20 items-center justify-between">
                <div className="flex items-center">
                  <Link href="/" className="hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/images/bi-logo.png"
                      alt="Backstage Interactive"
                      width={180}
                      height={40}
                      className="h-auto w-auto"
                      priority
                    />
                  </Link>
                </div>
                
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-4 py-2 text-base font-medium text-gray-700 hover:text-accent transition-colors duration-200 hover:scale-105 transform"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="sm:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-lg font-medium text-gray-700 hover:text-accent hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
