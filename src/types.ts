export type dataObj = { [key: string | number]: any }
export type postType = {
    _id?: string
    title?: string
    subtitle?: string
    description?: string
    overlap?: string
    tags?: string
    category?: string
    rawData?: string
    image?: string
    sideImgs?: string
    sideStyles?: string
    imageUrl?: string
    type?: string
    spaTitle?: string
    spaSubtitle?: string
    spaDescription?: string
    spaOverlap?: string
    spaRawData?: string
    html?: string
    spaHtml?: string
    published?: boolean
    removed?: boolean
    sideImages?: string[]
    sideImgsStyles?: React.CSSProperties[]
}

export type userType = {
    _id?: string
    username?: string
    email?: string
    password?: string
    newData?: { [key: string]: string }
    token?: string
}

export type susbscribeDataType = {
    email?: string
    fullname?: string
}

export type contactType = {
    email?: string
    name?: string
    message?: string
}

export type catMapType = { [key: string | number]: string }

export type cardType = {
    image?: string
    title?: string
    text?: string
}

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export type postHeadersType = {
    sideImages?: string[]
    sideImgStyles?: React.CSSProperties[]
    title?: string
    subtitle?: string
    spaTitle?: string
    spaSubtitle?: string
}

export type commentType = {
    _id?: string
    postId?: string
    fullname?: string
    email?: string
    comment?: string
    isDany?: boolean
    likes?: number
    replyingTo?: string
    createdAt?: Date
    updatedAt?: Date
}

export type emailType = {
    _id?: string
    fullname?: string
    email?: string
    capturedFrom?: string
    isActive?: boolean
    createdAt?: Date
    updatedAt?: Date
}

export type templateType = {
    _id?: string
    name?: string
    type?: string
    html?: string
    emailList?: string[]
    testEmails?: string
    subject?: string
    createdAt?: Date
    updatedAt?: Date
}