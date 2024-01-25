import { Sheet, SheetProps, useSheet, Text, Button, XStack } from 'tamagui';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useState } from 'react';

export default function SlideupPanel() {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(2); //2 is the index of whatever the value is in snapPoints prop

  return (
    <>
      <Button size="$4" icon={open ? ChevronDown : ChevronUp} onPress={() => setOpen((x) => !x)} />
      <Sheet
        zIndex={0}
        defaultOpen={false}
        defaultPosition={2}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 50, 15]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom//set this to false if you want the sheet to not to be closed by the user by swipping down
      >
        <Sheet.Frame ai="center" jc="center">
          <Button
            size="$6"
            circular
            icon={ChevronDown}
            onPress={() => {
              setOpen(false);
            }}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
