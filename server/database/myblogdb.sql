SELECT id article_id,COUNT(*) comment_count FROM 
(SELECT articles.`id`,comments.`article_id` FROM articles RIGHT JOIN comments ON comments.`article_id` = articles.`id`) t 
GROUP BY article_id HAVING COUNT(article_id)>=1
