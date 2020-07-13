const { thumb } = require('./thumb');

const preview = props => {
  let html = '';
  let parent = false;
  // if you couldn't tell, i'm very bad at regex
  const inline = props.post.content.match(/(((http|https|ftp):\/\/([\w-\d]+\.)+[\w-\d]+){0,1}(\/[\w~,;\-./?%&+#=]*))/ig) || [];
  inline.reverse();
  const href = props.post.service === 'patreon' || !props.post.service ? `/user/${props.post.user}/post/${props.post.id}` : `/${props.post.service}/user/${props.post.user}/post/${props.post.id}`;
  inline.forEach(url => {
    if ((/\.(gif|jpe?g|png|webp)$/i).test(url) && (/\/inline\//i).test(url)) {
      parent = true;
      html += thumb({
        src: url,
        href: href,
        class: 'thumb-child'
      });
    }
  });
  const attachments = props.post.attachments;
  attachments.reverse();
  attachments.forEach(attachment => {
    if ((/\.(gif|jpe?g|png|webp)$/i).test(attachment.path)) {
      parent = true;
      html += thumb({
        src: attachment.path,
        href: href,
        class: 'thumb-child'
      });
    }
  });
  html += thumb({
    src: props.post.post_type === 'image_file' || props.post.post_type === 'image' ? props.post.post_file.path : undefined,
    title: props.post.title,
    content: props.post.content.replace(/(&nbsp;|<([^>]+)>)/ig, ''),
    class: parent ? 'thumb-parent' : undefined,
    href: href
  });
  return html;
}

module.exports = { preview };