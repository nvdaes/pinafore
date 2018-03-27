import {
  composeButton, getNthStatus, scrollToStatus, scrollToTopOfTimeline, modalDialog, sleep, showMoreButton,
  scrollContainerToTop
} from '../utils'
import { foobarRole } from '../roles'

fixture`108-compose-dialog.js`
  .page`http://localhost:4002`

test('can compose using a dialog', async t => {
  await t.useRole(foobarRole)
  await scrollToStatus(t, 15)
  await t.expect(modalDialog.getAttribute('aria-hidden')).eql('true')
  await sleep(1000)
  await t.click(composeButton)
    .expect(modalDialog.hasAttribute('aria-hidden')).notOk()
    .typeText(modalDialog.find('.compose-box-input'), 'hello from the modal')
    .click(modalDialog.find('.compose-box-button-compose'))
    .expect(modalDialog.getAttribute('aria-hidden')).eql('true')
  await sleep(5000)
  await scrollToTopOfTimeline(t)
  await t.hover(getNthStatus(0))
  await scrollContainerToTop()
  await t
    .expect(showMoreButton.innerText).contains('Show 1 more')
    .click(showMoreButton)
  await t.expect(getNthStatus(0).innerText).contains('hello from the modal', {timeout: 20000})
})
