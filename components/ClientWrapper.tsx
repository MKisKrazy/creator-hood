 'use client'

import { SchematicProvider } from "@schematichq/schematic-react";
import SchematicWrapped from "./SchematicWrapped";
import { ConvexClientProvider } from "./ConvexClientProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const schematicPubkey= process.env.NEXT_PUBLIC_SCHEMATIC_PUBLISHABLE_KEY;
  if(!schematicPubkey){
    throw new Error(
      "No schematic Publishable key found"
    )
  }
  return (
    <ConvexClientProvider>
    <SchematicProvider publishableKey={schematicPubkey}>
      <SchematicWrapped>{children}</SchematicWrapped>
      </SchematicProvider>
    </ConvexClientProvider>
  );
}
