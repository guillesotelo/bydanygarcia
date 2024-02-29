import { commentType } from '../../types'
import User from '../../assets/icons/user-icon.svg'
import Dany from '../../assets/images/dany-comment-profile.png'

type Props = {
    comment?: commentType
}

export default function Comment({ comment }: Props) {
    return (
        <div className="comment__container">
            <img src={comment?.isDany ? Dany : User} alt="Comment Profile Image" className="comment__image" />
            <p className="comment__name">{comment?.fullname ? comment.fullname.split(' ')[0] : ''}</p>
            <p className="comment__message">{comment?.comment}</p>
        </div>
    )
}