'use client'
import { FC } from 'react'
import { trpc } from '@/lib/trpc/client'
import { Button } from './ui/button'

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm, SubmitHandler } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ComputersProps {

}

const formSchema = z.object({
    title: z.string().min(5, {
        message: "title must be at least 5 characters.",
    }),
})

const Computers: FC<ComputersProps> = ({ }) => {
    const utils = trpc.useContext()
    const { data: computers } = trpc.computers.getComputers.useQuery()
    const { data: books } = trpc.books.getBooks.useQuery()
    const { mutate: createComputer } = trpc.computers.createComputer.useMutation({
        onSuccess: () => {
            utils.computers.getComputers.invalidate()
        }
    })
    const { mutate: createBook } = trpc.books.createBook.useMutation({
        onSuccess: () => {
            utils.books.getBooks.invalidate()
        }
    })



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        createBook({ title: values.title })
    }

    return (
        <>
            <div>
                Your Computer: {computers?.computers.map((computer) => computer.brand).join(', ')}
            </div>
            <Button onClick={() => createComputer({ brand: 'intel i3' })}>
                Add a Computers
            </Button>
            <div>
                Your Book: {books?.books.map((book) => book.title).join(', ')}
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Book</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Book</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you`re done.
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input id="name" value="Pedro Duarte" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input id="username" value="@peduarte" className="col-span-3" />
                        </div>
                    </div> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is generate new Title Book.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogClose asChild>
                                <Button type="submit">Submit</Button>
                            </DialogClose>
                            {/* <Button type="submit">Submit</Button> */}
                        </form>
                    </Form>
                    {/* <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">Submit</Button>
                        </DialogClose>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
            {/* <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Title" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is generate new Title Book.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form> */}
        </>
    )
}

export default Computers