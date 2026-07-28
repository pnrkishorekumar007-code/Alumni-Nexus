"use client";

import { useState, useMemo } from "react";
import { Image as ImageIcon, BarChart3, TrendingUp, Send } from "lucide-react";
import { PublicLayout } from "@/components/layout/public-layout";
import { PageHeader } from "@/components/shared/page-header";
import { PostCard } from "@/components/cards/post-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPosts, getTrendingPosts } from "@/lib/data";
import { toast } from "sonner";

export default function CommunityPage() {
  const [postContent, setPostContent] = useState("");
  const [showPoll, setShowPoll] = useState(false);
  const posts = useMemo(() => getPosts(), []);
  const trending = useMemo(() => getTrendingPosts(), []);

  const handlePost = () => {
    if (!postContent.trim()) return;
    toast.success("Post published to the community feed!");
    setPostContent("");
    setShowPoll(false);
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Community"
          description="Share updates, celebrate milestones, and connect with the SRM network"
          breadcrumbs={[{ label: "Community" }]}
        />

        <Card className="glass-card mb-8">
          <CardContent className="p-5">
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Adithya" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share an update with the SRM community..."
                  className="w-full min-h-[80px] resize-none rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {showPoll && (
                  <div className="mt-3 p-3 rounded-lg border bg-muted/30 space-y-2">
                    <input
                      placeholder="Poll question..."
                      className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                    />
                    <input placeholder="Option 1" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                    <input placeholder="Option 2" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                    <input placeholder="Option 3" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
                  </div>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => toast.info("Image upload (demo)")}>
                      <ImageIcon className="h-4 w-4" /> Photo
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-1" onClick={() => setShowPoll(!showPoll)}>
                      <BarChart3 className="h-4 w-4" /> Poll
                    </Button>
                  </div>
                  <Button size="sm" className="gap-1" onClick={handlePost} disabled={!postContent.trim()}>
                    <Send className="h-4 w-4" /> Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="feed">
          <TabsList>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="trending" className="gap-1">
              <TrendingUp className="h-3 w-3" /> Trending
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feed" className="mt-6 space-y-4">
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </TabsContent>
          <TabsContent value="trending" className="mt-6 space-y-4">
            {trending.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </PublicLayout>
  );
}
