'use client'
import { FC } from 'react'
import { trpc } from '@/lib/trpc/client'
import { Button } from './ui/button'

interface ComputersProps {

}

const Computers: FC<ComputersProps> = ({ }) => {
    const utils = trpc.useContext()
    const { data: computers } = trpc.computers.getComputers.useQuery()
    const { mutate: createComputer } = trpc.computers.createComputer.useMutation({
        onSuccess: ()=>{
            utils.computers.getComputers.invalidate()
        }
    })
    return (
        <>
            <div>
                Your Computer: {computers?.computers.map((computer) => computer.brand).join(', ')}
            </div>
            <Button onClick={()=>createComputer({brand: 'intel i3'})}>
                Add a Computers
            </Button>
        </>
    )
}

export default Computers