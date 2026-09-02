# ROUT Companion importeren naar Lovable

## Doel
Het volledige TanStack Start-project van https://github.com/Routbe/route-companion-05a64951.git overzetten naar dit Lovable-project, zodat de preview opbouwt en de belangrijkste pagina's laden.

## Aanpak

1. **Code overzetten**
   - Bronbestanden kopiëren naar `/dev-server` (src/, public/, configuratie, migrations).
   - Behoud `.lovable/project.json` en gegenereerde Cloud-integratiebestanden.

2. **Backend op Lovable Cloud aansluiten**
   - Neon-client (`src/lib/db/*`) vervangen door Supabase-client uit Lovable Cloud.
   - `supabase/migrations/` toepassen op de Lovable Cloud-database.

3. **Buildbare preview maken**
   - `package.json` samenvoegen/vervangen en dependencies installeren.
   - Buildfouten en typefouten oplossen.
   - Smoke-test van `/` en een aantal publieke routes.

4. **Integratiegevoelige providers markeren**
   - Stripe, Brevo, GitLab/Mastodon OAuth, S3/Infomaniak en cron-jobs behouden als boundary, maar vereisen secrets/credentials na de preview.

## Niet in deze ronde
- Volledige end-to-end verificatie van betalingen, e-mail, OAuth en opslag (die hebben externe secrets nodig).
- Database-seed; de app start leeg tenzij records worden aangeleverd.
