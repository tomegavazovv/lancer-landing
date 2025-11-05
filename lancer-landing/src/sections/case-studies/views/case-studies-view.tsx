import { CaseStudyCard } from '../case-study-card';
const caseStudies = [
  {
    title: 'Webflow & CRO Expert: 7 Deals/Month',
    description:
      'Webflow expert transforms his Upwork strategy with our funnel system, achieving 38% open rates, 23% reply rates, and averaging 7 contracts per month worth $35K in total value.',
    image:
      'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/e244389a8f2cdd7eebcaa9da588ddff5?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCPyGGEgHS8xkLRuhXhP2b%2Fwc7PWicKPLH9SGwmDlzl6wIhAIk8leD7UU7QSe6onAb%2B4YTvOu15Uoc5Xaf98JxQycbkKpIFCH0QABoMNzM5OTM5MTczODE5Igynt7%2FNEVcRDAy2fv4q7wQo06uv9VkhMPoLFCeNQmdBuOz%2F76PHasymlR4j5yx1d6eFv04u6Ts7YWdTf6oXLYxQX%2Bulz6KHpKurXYN7OT%2FRzMRbN3rDGNarKvupd6lYele%2BYYGKylQOqqJcAN5%2BvQLz0mTNE28NUXLbplM0iS7T2h15xovZTvLWnvKDmNlwJmkh0wH9fkEAW%2Bsm8LQCTS%2FaoqZKwT7fwj5I%2FWj%2BlhWlwe19s38ahBsRFdUemDFt5ilFlW6coHm5awSFBbdPpp5qiwXtrEefqpfXz3AODlqv7N%2Fx77MZqPnus9TR%2BESDG4rOt2tamTT8iDgPvf2GdvFyi8pVnhW5SCb%2BIwAkurwtfE7%2FuZruJ9oFaklrnnMYLJ4daq78GidUcNfeCjzbHEvXgqf9yGDsHy5U%2FkQ2cb0HMmYJtU0qBgl%2FynKOVqeipgYu3du7%2Bi1%2FjkiOauzYrdZcvGS6%2FkQFDinYVfhoz99RIy%2FtCsS797T1JrxQ5d53UgJSYyvchkSL5J8DlVDsmWbds1MtLeTmDTzUyVO7yTLJixOXrttbtgqv%2Bm4%2BI1rHC9%2B7O5R9XytKR9QsV34LHL38m9w14ln9dHuDcE%2F3Heow2tvvgVfsOToHkOmY8EohlhWgGgeflPdxg2mc%2FibjoMsvrliJMV5w2IYtO1FpuPRAVWDFlc3mjRzB2vqDceokbrFVn1r7U6ylIFIuEfCLYWd5l%2FELJQFTxttOoyR%2F%2BP7JDuagNXFUWVMwR4Z11aw0yzpqCg13Ty%2BShgh6ZAc43L%2FoFkSdG5qJ9UZwBiNw99F3mH%2FMXrlpn4W1ZKTstB0Gyi3Ug3kb5ntAoWppJGrjzDC6panIBjqYARWg57y2S5AHhGC7cVNzhwIJq1%2F%2Fk9JO2HbiPJEpbkEIJIMz5jefagQ3tVCrvWM%2BUtkSJGCOZbUEPvfaEQjmYhfWr%2B46t2bO6G%2BlEOU2vI%2FbDlITgIJLZNN6ihJ%2BO9WJKeU1rojqVVEO0J5sU%2Be60XE%2F1ElubUl%2BnSpmalket1vVyLW1QF5nkx5vAwev2ilX%2BSjB%2B2sR%2Bd0n&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251104T192954Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5XXMOMTKR%2F20251104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=abc5f4d16350f0f665913cc4319c440f86d69207cd3136be75525de58330201e',
    readMoreUrl: '/case-studies/nikola',
  },
  {
    title: '$24K/month Upwork Funnel | iOS & MVP Developer',
    description:
      'Ex-Facebook engineer and iOS development boutique owner transforms his dormant Upwork presence into a $24K/month funnel with 33% open rates and consistent client wins.',
    image:
      'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/cebf652145d99223068f5ae1fe0c6a4c?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCPyGGEgHS8xkLRuhXhP2b%2Fwc7PWicKPLH9SGwmDlzl6wIhAIk8leD7UU7QSe6onAb%2B4YTvOu15Uoc5Xaf98JxQycbkKpIFCH0QABoMNzM5OTM5MTczODE5Igynt7%2FNEVcRDAy2fv4q7wQo06uv9VkhMPoLFCeNQmdBuOz%2F76PHasymlR4j5yx1d6eFv04u6Ts7YWdTf6oXLYxQX%2Bulz6KHpKurXYN7OT%2FRzMRbN3rDGNarKvupd6lYele%2BYYGKylQOqqJcAN5%2BvQLz0mTNE28NUXLbplM0iS7T2h15xovZTvLWnvKDmNlwJmkh0wH9fkEAW%2Bsm8LQCTS%2FaoqZKwT7fwj5I%2FWj%2BlhWlwe19s38ahBsRFdUemDFt5ilFlW6coHm5awSFBbdPpp5qiwXtrEefqpfXz3AODlqv7N%2Fx77MZqPnus9TR%2BESDG4rOt2tamTT8iDgPvf2GdvFyi8pVnhW5SCb%2BIwAkurwtfE7%2FuZruJ9oFaklrnnMYLJ4daq78GidUcNfeCjzbHEvXgqf9yGDsHy5U%2FkQ2cb0HMmYJtU0qBgl%2FynKOVqeipgYu3du7%2Bi1%2FjkiOauzYrdZcvGS6%2FkQFDinYVfhoz99RIy%2FtCsS797T1JrxQ5d53UgJSYyvchkSL5J8DlVDsmWbds1MtLeTmDTzUyVO7yTLJixOXrttbtgqv%2Bm4%2BI1rHC9%2B7O5R9XytKR9QsV34LHL38m9w14ln9dHuDcE%2F3Heow2tvvgVfsOToHkOmY8EohlhWgGgeflPdxg2mc%2FibjoMsvrliJMV5w2IYtO1FpuPRAVWDFlc3mjRzB2vqDceokbrFVn1r7U6ylIFIuEfCLYWd5l%2FELJQFTxttOoyR%2F%2BP7JDuagNXFUWVMwR4Z11aw0yzpqCg13Ty%2BShgh6ZAc43L%2FoFkSdG5qJ9UZwBiNw99F3mH%2FMXrlpn4W1ZKTstB0Gyi3Ug3kb5ntAoWppJGrjzDC6panIBjqYARWg57y2S5AHhGC7cVNzhwIJq1%2F%2Fk9JO2HbiPJEpbkEIJIMz5jefagQ3tVCrvWM%2BUtkSJGCOZbUEPvfaEQjmYhfWr%2B46t2bO6G%2BlEOU2vI%2FbDlITgIJLZNN6ihJ%2BO9WJKeU1rojqVVEO0J5sU%2Be60XE%2F1ElubUl%2BnSpmalket1vVyLW1QF5nkx5vAwev2ilX%2BSjB%2B2sR%2Bd0n&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251104T193314Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5XXMOMTKR%2F20251104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=4ffec58b7aed2ab595bcffe260743fd66da6a1a638113a75601f44fb36b769c1',
    readMoreUrl: '/case-studies/martin',
  },
  {
    title: '$40K/month Upwork Funnel | AI Agents & Automation Expert',
    description:
      'Fast-growing agency owner automates his Upwork outreach with 400 proposals/month, achieving 34% open rates, 15% reply rates, and $40K monthly revenue while reclaiming 10 hours per week.',
    image:
      'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/27e37845c8e393c0dfaf03ecc4af7355?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCUTelyLKYPijcL338E0UPJH1OWZqxua0ZN%2BgFmtuYH6gIhAOxBz3DESIyl8djnC00lJtO037a0z09YdWiZGjK3%2BsDeKpIFCHwQABoMNzM5OTM5MTczODE5IgwQeOAHp7cAFPOaCWwq7wQ9oLxw8P%2BYro2z1WdEq3x2HwA0t3JYqwhFBdlWXOzXI5VMEK6leRdmy7HOCejxsmgY%2FUSrzsAJwGZYavEWCtc3gh3QJ0fbnpRwiJGKEORWUtAgUrzgpdTivv25r2CU7VTf3PCy3IG3S72CFFSmqSECUV1HARYNIbLKM2rXhUpPe%2Br2kXDNFIwkTJms8hlAyX7Y3XBQCPuX%2B4NAy2D9i%2F4HtXJkv7%2F64lzCKu8faF1QNj1PyL3srtKF8KarZYzRwMAzusIn9PZIHMYf2L0tuqMGD1F6ejdmIeo3oBtoq%2BS9SyuggM9daC%2Fu3H%2FSQq7NznWXpIy%2FX00YhQZ6VOhzsqegIYbsh65Z3dsTqtfE7jYbRW8%2F9ohl4UG8Y89p4g2i5Omk1pEPOaN9dFbbOOOtjNXErWm1b8Cnsn5RkaHLhXUsgz9JgNlkp8mEbuJEwv3kMwuX%2BZX85rIU%2Fih50S7CimVN1YLwYdGpaYyC5qrEDKz6CcXN4CSRrccOF63zKyjXLhXBwMult4HiLUNeF7lhoGS92tv531upK%2BHljzL4arKDcYC8MYfS%2FVHx9zwGugPfS6IYBnB3lUfasF8PE%2Fvc%2Fmjfr9e%2FkXCB0UoaJZ7FRFH23k%2B42ELiCoTzeM86wYVcJDKN8YjMd3BLOguzg9dJLtX9TbGV2HJHI0NrQJpvYufXEZ5Pm94fzwReb%2Bs%2FHV4unLs2f0TnLaCeQH7Ci6uaBYLE4lQyEjm8TMoYQqmXlJSQK2%2FELAkvvUjJdUbZnO00I54RgK4Q8tzQuAU9FtFLCuJA5Z1fLl6BjrTPycIivGck7FsUgsgGj3vs1Ey3yclG8DDMk6nIBjqYAUuxALhsi7BpHH1i%2B9chPAc3IJrfoJax0fkqlDfalVarmmHZi17hk3j6IXt7yW4D9f9XUwwEggA%2F3zMyz4TcEediAoBpofWJkvb3ILD9iaj9MOVnwkycmXuFf4Gc2JxB0eCfbWn%2FC8LM%2BBw%2B5kfwaZDsH85rdPjUCA%2ByrxYqmsMtU1uQQ%2F4JhL0og%2Fcm45eKCo%2F%2B24tmwzzn&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251104T193443Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5WAT7PVIE%2F20251104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=61988b51290accba795f31a17d1aec2ffbfedc76c4f70705b49e0a82d46eb4aa',
    readMoreUrl: '/case-studies/nando',
  },
  {
    title:
      '6 Contracts First Month | Automated Upwork Funnel | Email Marketing',
    description:
      'Veteran Upwork freelancer switches from a failing competitor tool to Lancer, achieving 6 contracts in his first month with 24.5% open rates and 13.2% reply rates.',
    image:
      'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/68b0bfcb9d9ad21ff65a148626e6f1ee?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfFiPxn1rDqrjTQztJVE6xB7cMLXwarjA8SdRfmRiGLgIgHB4oreayAfw0%2FUp%2F4LvznYXmBUQ2EHH0eEC7gIElL7UqkgUIfRAAGgw3Mzk5MzkxNzM4MTkiDGnJTBvdA%2FEHO3Ws1irvBCdvQ9qf8p6YGc%2FYaUa2mVG1mcmAQzHcNSkHoFHDBLxdTHF5yGWVGkH6jbD9mYASjJNwRFY6AEb1sQFx%2Fgi6S%2F%2BY5DwYpmH1KklpleEtu9yBhQQrkK0A7ZZcUky9jcJ4aNSICZ3mHkxCYtvIchPhfe9ILDZuSnmP6lWQ6SFXw1v58OLupL%2F7a%2Fk0lBf9k3Udf0yrj56aEoJHINDLqIedAMqOcvnA4%2BBZvUua63qiOEnuOHeDza4i6bM9NgTCjgrmlZsP9BJnDQxAtgu7v%2Fm4GyE2kJRp6kF3UAZtnvhSb4lL6S6sfpN%2Bwvx9Wm39TybnAq8YpEcGsBCJ%2BsaXrSmH%2BztZo%2FV13xQQegSEmkuYtiuR94IKn72MENp5sJZkSL%2BbC38V7jOJN%2Flsw4vFj0s3kaTXu0ZR5%2BtL2ZHOHvvKZfahC6%2FsRSOPC1taMWelU4zRSEEXSlzrnc0iwZx8Im0CIWWIGl6T3%2FtEvnvgMCCmtAaaP4w1zR4FRabmVRm5FvI%2B%2BVA806pYfdakK1s8dNy55CUDaVglsvKJJAiDVWA0skq7atxtos%2FAmOKx0PPXY3YKUfE3t9VvivthvIOWS%2BgX1lh%2BZsVvrjvdndWyN8RPxaiO12tokiM2%2B0twYXQpAchil%2BU6yipQUWC314Wc88GzPf1755dP4HUXQe5u8Ax95d9LsmtCoGsD5NbL8pTtIVIJPezev%2BWv%2FHNn8pyD%2FWEmRV79qHx%2B5E8f1XbxKV%2BJTd8OP%2FMvm1Nz8qgGjOlLe%2FMjbEBzYB1iJk1uyrKoZ3BfSmxLxo0hLCpuIc6X9tlySCB57xWqjUum4RAHBTndEd5LMNenqcgGOpkBGYS5sALCGISnWPppkX4llEtj9QbIj%2FThLVj7MEdW3DY6nY%2F76zzo7TqB26kuZ25h44cV2RbiBSzfFaQvFUsnX%2FtAmQWIguDAFJoRzuURNkfLCIgEjndeJ5ZaQ3oA%2BKLneNyFquOvvp9zeh%2FthFJi9wfgsS7a%2B7RAbK2EB1fM7KjzafAxDmY25puYLymppj5CEQgWhNVY06hs&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251104T193554Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5TQRZ5CYV%2F20251104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=4b076349221713b489bf496dd9d10f0ac4b6b5859064c0f3c9968399b145a1ad',
    readMoreUrl: '/case-studies/arul',
  },

  {
    title: '26% Reply Rate Upwork Funnel | PPC Expert | Meta & Google Ads',
    description:
      'Already successful PPC expert scales his proven approach with AI automation, achieving absolutely bonkers results: 46.4% open rates and 26.1% reply rates on Upwork.',
    image:
      'https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/74dcad608f0c3bda2d46f1f6517c8fe5?response-content-disposition=inline%3B%20filename%3D%22image_original%22%3B%20filename%2A%3Dutf-8%27%27image_original&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDfFiPxn1rDqrjTQztJVE6xB7cMLXwarjA8SdRfmRiGLgIgHB4oreayAfw0%2FUp%2F4LvznYXmBUQ2EHH0eEC7gIElL7UqkgUIfRAAGgw3Mzk5MzkxNzM4MTkiDGnJTBvdA%2FEHO3Ws1irvBCdvQ9qf8p6YGc%2FYaUa2mVG1mcmAQzHcNSkHoFHDBLxdTHF5yGWVGkH6jbD9mYASjJNwRFY6AEb1sQFx%2Fgi6S%2F%2BY5DwYpmH1KklpleEtu9yBhQQrkK0A7ZZcUky9jcJ4aNSICZ3mHkxCYtvIchPhfe9ILDZuSnmP6lWQ6SFXw1v58OLupL%2F7a%2Fk0lBf9k3Udf0yrj56aEoJHINDLqIedAMqOcvnA4%2BBZvUua63qiOEnuOHeDza4i6bM9NgTCjgrmlZsP9BJnDQxAtgu7v%2Fm4GyE2kJRp6kF3UAZtnvhSb4lL6S6sfpN%2Bwvx9Wm39TybnAq8YpEcGsBCJ%2BsaXrSmH%2BztZo%2FV13xQQegSEmkuYtiuR94IKn72MENp5sJZkSL%2BbC38V7jOJN%2Flsw4vFj0s3kaTXu0ZR5%2BtL2ZHOHvvKZfahC6%2FsRSOPC1taMWelU4zRSEEXSlzrnc0iwZx8Im0CIWWIGl6T3%2FtEvnvgMCCmtAaaP4w1zR4FRabmVRm5FvI%2B%2BVA806pYfdakK1s8dNy55CUDaVglsvKJJAiDVWA0skq7atxtos%2FAmOKx0PPXY3YKUfE3t9VvivthvIOWS%2BgX1lh%2BZsVvrjvdndWyN8RPxaiO12tokiM2%2B0twYXQpAchil%2BU6yipQUWC314Wc88GzPf1755dP4HUXQe5u8Ax95d9LsmtCoGsD5NbL8pTtIVIJPezev%2BWv%2FHNn8pyD%2FWEmRV79qHx%2B5E8f1XbxKV%2BJTd8OP%2FMvm1Nz8qgGjOlLe%2FMjbEBzYB1iJk1uyrKoZ3BfSmxLxo0hLCpuIc6X9tlySCB57xWqjUum4RAHBTndEd5LMNenqcgGOpkBGYS5sALCGISnWPppkX4llEtj9QbIj%2FThLVj7MEdW3DY6nY%2F76zzo7TqB26kuZ25h44cV2RbiBSzfFaQvFUsnX%2FtAmQWIguDAFJoRzuURNkfLCIgEjndeJ5ZaQ3oA%2BKLneNyFquOvvp9zeh%2FthFJi9wfgsS7a%2B7RAbK2EB1fM7KjzafAxDmY25puYLymppj5CEQgWhNVY06hs&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20251104T193641Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5TQRZ5CYV%2F20251104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=6d7509870892052c61f95d8856396b61a4302128d603e72b493d7064650c4b62',
    readMoreUrl: '/case-studies/will',
  },
];

export default function CaseStudiesView() {
  return (
    <div className='min-h-screen' style={{ backgroundColor: '#0A0A0A' }}>
      {/* Header Section with proper spacing for fixed navbar */}
      <section className='relative pt-20 pb-10 lg:pt-40'>
        <div className='mx-auto max-w-7xl px-6 text-center'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent'>
            Case Studies
          </h1>
          <p className='mt-6 text-lg md:text-xl text-white/80 max-w-xl mx-auto leading-relaxed'>
            Real success stories from freelancers who transformed their Upwork
            careers with Lancer
          </p>
        </div>
      </section>

      {/* Case Studies Content */}
      <section className='py-20'>
        <div className='mx-auto max-w-7xl px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard
                key={index}
                title={caseStudy.title}
                description={caseStudy.description}
                image={caseStudy.image}
                readMoreUrl={caseStudy.readMoreUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
