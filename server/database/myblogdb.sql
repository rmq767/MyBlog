SELECT * FROM messages WHERE is_delete = 0  ORDER BY id DESC LIMIT 10;
    SELECT * FROM messagereply r WHERE r.is_delete=0;