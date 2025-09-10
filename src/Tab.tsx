
type TabParams = {
    active: boolean
    title: string
    onClick: (arg: string) => void
}

export function Tab({ active, title, onClick }: TabParams) {
    function onclick() {
        onClick(title)
    }
    const className = active ? "active" : "";
    return <a className={className} onClick={onclick}>{title}</a>
}

export function Separator() {
    return <div className="ml-auto" />
}
