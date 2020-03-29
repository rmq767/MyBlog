SELECT commentreply.id,i_name,r_name,c_reply,commentreply.date
    FROM commentreply,comments 
    WHERE commentreply.comment_id = comments.id AND commentreply.is_delete = 0 ORDER BY commentreply.id DESC