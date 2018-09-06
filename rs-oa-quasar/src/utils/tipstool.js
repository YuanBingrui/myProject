import { Dialog, Loading, QSpinnerBall, Notify } from 'quasar'

export const presentAlertButtonYes = message => {
  Dialog.create({
    title: '提示',
    message: message,
    ok: '确定'
  })
}

export const presentLoading = () => {
  Loading.show({
    spinner: QSpinnerBall,
    spinnerSize: 36
  })
}

export const dismissLoading = () => {
  Loading.hide()
}

export const presentNoData = message => {
  Notify.create({
    message: message,
    timeout: 1000,
    type: 'warning'
  })
}
