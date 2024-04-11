"use client";

import { useState, type FormEvent, type ReactNode, useEffect } from "react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faTrash,
  faGrip,
} from "@fortawesome/free-solid-svg-icons";
import {
  RoomProvider,
  useMutation,
  useOthers,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import * as Form from "@radix-ui/react-form";
import * as Dialog from "@radix-ui/react-dialog";
import { Reorder, useDragControls } from "framer-motion";
import { PollOption } from "@/app/types/pollOption";

function Room({
  roomName,
  children,
}: {
  roomName: string;
  children: ReactNode;
}) {
  // HACK: This has to be done in order to satisfy
  //       Next.js' SSR
  // TODO: This brings back the flashing
  const [name, setName] = useState("");
  useEffect(() => {
    const n = localStorage.getItem("user-name")!;
    setName(n);
  }, []);

  const updateName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userName = String(formData.get("user-name"));
    localStorage.setItem("user-name", userName);
    setName(userName);
  };

  return (
    <div>
      {name && (
        <RoomProvider
          id={roomName}
          initialPresence={{ name }}
          initialStorage={{
            points: new LiveList(),
            pollOptions: new LiveList(),
          }}
        >
          <ClientSideSuspense fallback={<p>Loading...</p>}>
            {() => children}
          </ClientSideSuspense>
        </RoomProvider>
      )}
      {!name && (
        <Form.Root onSubmit={updateName} className="mt-[5dvh] md:mt-[15dvh]">
          <Form.Field name="user-name" className="mb-[5dvh] flex items-center">
            <Form.Label className="md:text-xl">Enter Name</Form.Label>
            <Form.Control asChild>
              <input
                className="ml-4 grow rounded-md border border-black px-2 py-1 [appearance:textfield] md:text-xl dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                placeholder="My Name"
                autoFocus
              />
            </Form.Control>
          </Form.Field>
          <Form.Submit asChild className="flex">
            <button className="mx-auto rounded-md border border-black p-2 text-xl md:p-4 md:text-2xl dark:border-gray-200">
              Submit
            </button>
          </Form.Submit>
        </Form.Root>
      )}
    </div>
  );
}

function Poll({ pollName }: { pollName: string }) {
  const options = useStorage((root) => root.pollOptions);
  const others = useOthers();

  const addPollOption = useMutation(({ storage }, name) => {
    storage
      .get("pollOptions")
      .push(
        new LiveObject({ id: window.crypto.randomUUID(), name, checkedBy: [] }),
      );
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newOption = String(formData.get("new-option"));
    addPollOption(newOption);
  };

  const setPollOptions = useMutation(({ storage }, options) => {
    storage.set(
      "pollOptions",
      new LiveList(
        options.map((o: { id: string; name: string; checkedBy: string[] }) => {
          return new LiveObject({
            id: o.id,
            name: o.name,
            checkedBy: o.checkedBy,
          });
        }),
      ),
    );
  }, []);

  const getVoters = (): Array<string> => {
    const voters = new Set<string>();

    for (const o of options) {
      for (const n of o.checkedBy) {
        voters.add(n);
      }
    }

    return Array.from(voters).toSorted();
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold sm:grow sm:text-3xl">
          {decodeURIComponent(pollName)}
        </h1>
        <div className="flex space-x-1 truncate sm:w-1/3 sm:justify-end">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button className="font-light">
                {others.length} other users online
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/70" />
              <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-white p-[25px] focus:outline-none dark:border-white dark:bg-black">
                <Dialog.Title className="text-xl font-medium text-black dark:text-white">
                  Other Users Online
                </Dialog.Title>
                <Dialog.Description className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  Click on background to close
                </Dialog.Description>
                {others.length > 0 && (
                  <ul className="ml-6">
                    {others.map((o) => (
                      <li className="list-disc" key={o.presence.name}>
                        {o.presence.name}
                      </li>
                    ))}
                  </ul>
                )}
                {others.length === 0 && (
                  <p>There are currently no other users online</p>
                )}
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
      <Form.Root className="flex items-center space-x-4" onSubmit={onSubmit}>
        <Form.Field name="new-option">
          <Form.Control asChild>
            <input
              className="rounded-md border border-black px-2 py-1 [appearance:textfield] dark:border-gray-200 dark:bg-black [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="New Option"
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button
            type="submit"
            className="h-8 w-8 rounded-full border border-black dark:border-white"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </Form.Submit>
      </Form.Root>
      <Reorder.Group
        values={options as { id: string; name: string; checkedBy: string[] }[]}
        onReorder={setPollOptions}
        className="space-y-3"
        axis="y"
      >
        {options.map((option) => (
          <Item key={option.id} option={option} />
        ))}
      </Reorder.Group>
      <h2 className="text-xl">All Voters</h2>
      <ul>
        {getVoters().map((v) => (
          <li className="ml-8 list-disc" key={v}>
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Item({ option }: { option: PollOption }) {
  const name = useSelf((me) => me.presence.name);
  const controls = useDragControls();

  const deleteOption = useMutation(({ storage }, id) => {
    const options = storage.get("pollOptions");
    const idx = options.findIndex((option) => option.get("id") === id);
    options.delete(idx);
  }, []);

  const onCheckedChange = (
    checked: boolean | "indeterminate",
    optionId: string,
  ) => {
    if (checked) {
      addNameToCheckedBy(optionId);
      return;
    }
    removeNameFromCheckedBy(optionId);
  };

  const addNameToCheckedBy = useMutation(({ storage }, id) => {
    const option = storage.get("pollOptions").find((o) => o.get("id") === id);
    option?.set("checkedBy", [...option?.get("checkedBy")!, name!]);
  }, []);

  const removeNameFromCheckedBy = useMutation(({ storage }, id) => {
    const option = storage
      .get("pollOptions")
      .find((option) => option.get("id") === id);
    option?.set(
      "checkedBy",
      option.get("checkedBy").filter((n) => n !== name),
    );
  }, []);

  return (
    <Reorder.Item value={option} dragListener={false} dragControls={controls}>
      <div className="flex w-full items-center space-x-2 sm:space-x-7">
        <div className="hidden sm:block">
          <FontAwesomeIcon
            icon={faGrip}
            onPointerDown={(e) => controls.start(e)}
          />
        </div>
        <p className="grow">{option.name}</p>
        <Checkbox.Root
          defaultChecked={option.checkedBy.includes(name!)}
          onCheckedChange={(checked: boolean | "indeterminate") =>
            onCheckedChange(checked, option.id)
          }
          className="flex max-h-[42px] min-h-[42px] min-w-[42px] max-w-[42px] appearance-none items-center justify-center rounded border border-black p-1 outline-none dark:border-white"
        >
          <Checkbox.Indicator>
            <FontAwesomeIcon icon={faCheck} />
          </Checkbox.Indicator>
        </Checkbox.Root>
        <p className="min-w-10 max-w-10 text-right text-xl font-bold">{`${option.checkedBy.length}`}</p>
        <div className="min-w-[56px] max-w-[56px]">
          {option.checkedBy.length > 0 && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="h-[42px] text-nowrap rounded border border-black p-1.5 dark:border-white">
                  Votes
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/70" />
                <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-white p-[25px] focus:outline-none dark:border-white dark:bg-black">
                  <Dialog.Title className="text-xl font-medium text-black dark:text-white">
                    Votes
                  </Dialog.Title>
                  <Dialog.Description className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Click on background to close
                  </Dialog.Description>
                  <ul className="ml-6">
                    {option.checkedBy.map((cb) => (
                      <li className="list-disc" key={cb}>
                        {cb}
                      </li>
                    ))}
                  </ul>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          )}
        </div>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="h-[42px] rounded border border-black p-2 dark:border-white">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-white p-[25px] focus:outline-none dark:border-white dark:bg-black">
              <Dialog.Title className="text-xl font-medium text-black dark:text-white">
                Delete &quot;{option.name}&quot;
              </Dialog.Title>
              <Dialog.Description className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                Click on background to close
              </Dialog.Description>
              <p className="mb-4">
                Deleting this option will also delete all its votes. Are you
                sure you want to delete?
              </p>
              <div className="flex justify-between">
                <Dialog.Close asChild>
                  <button className="rounded border border-black px-2 py-1 dark:border-white">
                    Dismiss
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild>
                  <button onClick={() => deleteOption(option.id)}>
                    Delete
                  </button>
                </Dialog.Close>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </Reorder.Item>
  );
}

export default function Page({ params }: { params: { pollName: string } }) {
  return (
    <Room roomName={params.pollName}>
      <Poll pollName={params.pollName} />
    </Room>
  );
}
