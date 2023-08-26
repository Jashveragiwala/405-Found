# Documentation

## Resources

- SvelteKit: https://kit.svelte.dev/
- Svelte: https://svelte.dev/docs/
- TailwindCSS: https://tailwindcss.com/
- DaisyUI: https://daisyui.com/docs/use/
- Supabase: https://supabase.com/docs

## Developing

First install dependencies with `npm install` (or `pnpm install` or `yarn`).<br>

Include .env file in your local machine (only available in group chat. Remember to rename the file to .env).<br>

Start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

For auth update, run:
```bash
 npm install @supabase/supabase-js -D
 ```
 
 and

 ```bash
 npm install @supabase/auth-helpers-sveltekit -D
 ```