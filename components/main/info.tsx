interface InfoProps
    extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    value: any;
}

export const Info = ({ title, value }: InfoProps) => {
    return (
        <div className="flex items-center space-x-4">
            <div>
                {title}
            </div>
            <div className="flex items-center gap-x-2 bg-grayscale-200 px-2.5 py-1 rounded-sm">
                {value}
            </div>
        </div>
    )
}
