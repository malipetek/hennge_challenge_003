# IMPROVEMENTS

We can use a state management if this app is to be more complex. 

Emails are loaded once app component is mounted, it can be server side rendered.

I reused `EmailsListEmail` component for list header to reuse styles. It turned out to be a mistake because many of the styles related to list header required exceptions. These can be seperated into 2 components or list header can go into `EmailsList` component as it is not actually reused.
