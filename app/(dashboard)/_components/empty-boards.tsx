"use client";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { toast } from "sonner";

export const EmptyBoards = () => {
    const {mutate, pending} = useApiMutation(api.board.create); //using mutation for button creation

    const { organization } = useOrganization();
    const onClick = () => {

        if(!organization) return;

        mutate({
            orgId: organization.id,
            title:"Untitled board"
        })
            .then((id) => {
                toast.success("Board created");
            })
            .catch(() => toast.error("Failed to create board"))
    }
    return(
        <div className="h-full flex flex-col items-center justify-center">
            <Image 
                src="/note.svg"
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create a board!
            </h2>
            <p className="text-muted-foreground text-sm mt-4">
                Start by creating a board for your org!
            </p>
            <div className="mt-6">
                <Button 
                    disabled={pending}
                    onClick={onClick}
                    size="lg">
                    Create board
                </Button>
            </div>
        </div>
    )
}