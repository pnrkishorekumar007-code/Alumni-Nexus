"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, MoreHorizontal, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Post } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const totalPollVotes = post.poll?.options.reduce((sum, o) => sum + o.votes, 0) ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="glass-card hover:shadow-lg transition-all duration-300">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{post.authorName}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                <p className="text-xs text-muted-foreground">{formatRelativeTime(post.createdAt)}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="mt-4 text-sm whitespace-pre-line leading-relaxed">{post.content}</p>

          {post.image && (
            <div className="relative mt-4 rounded-xl overflow-hidden">
              <Image src={post.image} alt="Post image" width={400} height={192} className="w-full h-48 object-cover" unoptimized />
            </div>
          )}

          {post.poll && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <BarChart3 className="h-4 w-4" />
                {post.poll.question}
              </div>
              {post.poll.options.map((option) => {
                const pct = totalPollVotes > 0 ? Math.round((option.votes / totalPollVotes) * 100) : 0;
                return (
                  <div key={option.text} className="relative rounded-lg border p-3 overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="absolute inset-0 bg-primary/10" style={{ width: `${pct}%` }} />
                    <div className="relative flex justify-between text-sm">
                      <span>{option.text}</span>
                      <span className="font-medium">{pct}%</span>
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-muted-foreground">{totalPollVotes} votes</p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between border-t pt-3">
            <Button variant="ghost" size="sm" className="gap-2" onClick={handleLike}>
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
              {likeCount}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              {post.shares}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
