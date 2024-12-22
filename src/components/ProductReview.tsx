import { useState, FormEvent } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import {
  useGetCommentsQuery,
  usePostCommentMutation,
} from '@/redux/features/products/productsApi';

interface ProductReviewProps {
  id: string | undefined;
}

interface IComments {
  id: number;
  productId: string;
  comment: string;
}

export default function ProductReview({ id }: ProductReviewProps) {
  const [comment, setComment] = useState('');
  const { data: comments } = useGetCommentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  // component unmount hye mount hle fetch korbe
  // we can also add pollingInterval

  const [postComment, { isLoading, isError }] = usePostCommentMutation();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newComment = {
      id: comments?.length + 1 || 1,
      productId: id,
      comment,
    };
    postComment(newComment);
    setComment('');
  };

  const productComment: IComments[] = comments?.filter(
    (item: IComments) => item.productId === id
  );

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form onSubmit={handleSubmit} className="flex gap-5 items-center">
        <Textarea
          className="min-h-[30px]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a comment..."
          disabled={isLoading}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
          disabled={isLoading}
        >
          <FiSend />
        </Button>
      </form>
      {isError && (
        <p className="text-red-500 mt-2">
          Failed to post comment. Please try again.
        </p>
      )}
      <div className="mt-10">
        {productComment?.map((item, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{item?.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
