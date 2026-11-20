# Stodd Group — Topic Pipeline

Topics queued for weekly auto-articles. The weekly routine picks the TOP unchecked topic from the Queue, writes the article, previews in chat, and commits on your approval.

**Add/edit topics freely. The weekly routine reads from this file.**

---

## Queue (next to publish, top first)

### 1. Radon Testing When Buying a Utah Home: Timing, Cost, and Negotiating Mitigation
- **Primary keyword**: radon testing utah home purchase
- **Volume gut-check**: med
- **Competitor coverage gap**: https://deq.utah.gov/waste-management-and-radiation-control/testing-your-home-for-radon (general guidance); results are otherwise inspector franchise pages. Nobody connects radon to REPC due-diligence deadlines or who pays for mitigation.
- **Tags**: buying, home-prep
- **Audience**: all buyers; sellers prepping to list
- **Compliance exposure**: none — cite Utah DEQ; no health claims beyond official guidance
- **Angle**: Utah DEQ says 1 in 3 Utah homes has dangerous radon levels. Short-term tests vs. continuous monitors, scheduling the test early in due diligence, typical mitigation cost, and how to ask the seller to cover mitigation.
- **Why it ranks**: Thin franchise pages own the results; a REALTOR-written, contract-aware guide can outrank them.

### 2. Assumable FHA and VA Loans in Utah: How to Take Over a 3% Mortgage
- **Primary keyword**: assumable mortgage utah
- **Volume gut-check**: low
- **Competitor coverage gap**: https://bestutahrealestate.com/news/va-loan-assumption-explained-how-it-works-for-utah-buyers (templated city pages); https://www.rocketmortgage.com/learn/what-is-an-assumable-mortgage (national); https://kutv.com/news/eye-on-your-money/little-known-option-could-save-home-buyers-1k-a-month-new-mortgages-professionals-real-estate (news, not a how-to).
- **Tags**: financing, buying
- **Audience**: first-time buyers, move-up buyers
- **Compliance exposure**: none — no rate promises; "confirm with the loan servicer"
- **Angle**: Where assumable loans cluster (Davis/Weber near Hill AFB, 2020-22 originations), finding them in MLS remarks, the 45-90 day servicer approval, the VA entitlement catch, and covering the equity gap with cash or a second loan.
- **Why it ranks**: Low volume but very high intent while rates stay elevated, and good answers are scarce.

### 3. Seller Closing Costs in Utah: What You'll Actually Net at Closing
- **Primary keyword**: seller closing costs utah
- **Volume gut-check**: med
- **Competitor coverage gap**: https://listwithclever.com/real-estate-blog/seller-closing-costs-in-utah/, https://www.houzeo.com/blog/seller-closing-costs-utah/, https://www.realestatewitch.com/seller-closing-costs/utah/ — discount-brokerage lead funnels with conflicting figures (2.5% vs. 8-10%). None walks through a real Utah net sheet.
- **Tags**: selling
- **Audience**: sellers
- **Compliance exposure**: REALTOR code — commissions are negotiable post-NAR settlement; never state a "standard" rate
- **Angle**: Line-by-line net sheet on a ~$530K home (current state median): no Utah transfer tax, owner's title policy, escrow splits under the REPC, buyer-agent compensation, concessions in today's price-cut market, and prorated taxes and HOA dues.
- **Why it ranks**: High-intent seller query where the top results are lead-gen; fills the site's thinnest content area.

### 4. Retiring in Holladay, Utah: Downsizing, 55+ Options, and the Real Cost
- **Primary keyword**: retire in holladay utah (secondary: downsizing salt lake county)
- **Volume gut-check**: low
- **Competitor coverage gap**: https://stacker.com/stories/utah/best-places-retire-utah (Niche-ranked list, no buyer context); https://www.55places.com/utah/area/salt-lake-city-area (directory only). No REALTOR-side guide on downsizing within the Salt Lake Valley.
- **Tags**: neighborhoods, relocation
- **Audience**: move-down buyers (empty nesters, retirees)
- **Compliance exposure**: Fair Housing — 55+ communities under HOPA may be described; don't steer by age or family status otherwise. Tax/legal for retirement-income taxation.
- **Angle**: Why Holladay ranks high for retirees (established neighborhoods, healthcare access, canyon proximity), what downsizing within Salt Lake County looks like, nearby 55+ options (Millcreek, South Jordan), selling the family home first vs. buying first, and how Utah taxes retirement income.
- **Why it ranks**: Local downsizers are a real, high-equity audience and nobody writes for them by city.

---

## Published (auto-maintained by weekly routine)

_Entries move here after the weekly routine publishes them._

- [x] 2026-11-19 - Utah's 45% Primary Residential Exemption: The New Filing Rule Every Homebuyer Needs to Know (2027)

---

## Notes for the automation

- Topics at the top are oldest / highest priority. The weekly routine always picks the first unchecked (`- [ ]`) item.
- The weekly routine commits straight to main after your explicit approval in chat and moves the published topic to the Published section.
- Edit, reorder, delete, or add topics freely — the routine respects whatever's in the Queue section when it runs.
- Compliance rules are enforced in the writer prompt regardless of what's in this file.
- The 10 valid tags: `buying`, `first-time-buyers`, `selling`, `investing`, `house-hacking`, `financing`, `neighborhoods`, `relocation`, `market-updates`, `home-prep`. Use kebab-case.
- Audience field is for topic-mix balance when planning the monthly batch — the weekly routine doesn't filter on it.
