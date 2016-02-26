# Youku Link Preview for Mixmax

This link resolver displays an embedded youku video with the title by using the video's id.
First the video webpage is navigated to, and from the response html we parse the title.
Then the title is presented formatted (as a link to the video webpage) above an embedded player.

## Running locally

1. Install using `npm install`
2. Run using `npm start`

To simulate locally how Mixmax calls the resolver URL (to return HTML that goes into the email), run:

```
curl http://localhost:9146/resolver?url=http%3A%2F%2Fv.youku.com%2Fv_show%2Fid_XMTM5MjUxNDM0NA.html
```
