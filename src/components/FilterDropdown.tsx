"use client";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface FilterDropdownProps {
    label: string;
    options: string[];
    onSelect: (value: string) => void;
}

export default function FilterDropdown({ label, options, onSelect }: FilterDropdownProps) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="inline-flex justify-center rounded-md bg-slate-800 px-3 py-1 text-sm text-white hover:bg-slate-700">
                {label}
                <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5 text-gray-300" />
            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-slate-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {options.map((option) => (
                        <Menu.Item key={option}>
                            {({ active }) => (
                                <button
                                    onClick={() => onSelect(option)}
                                    className={`${
                                        active ? "bg-slate-600" : ""
                                    } block w-full px-4 py-2 text-sm text-white text-left`}
                                >
                                    {option}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
