import styled from "styled-components";
export const ToastContainerWrapper = styled.div`
  .Toastify__toast-container {
    width:auto;
    z-index: 9999;
  }
  .Toastify__toast {
    font-family: normal;
    white-space: pre;
    font-size: 14px;
    color:#0A0A0A;
  }
  .Toastify__toast--success {
    background-color: #FFFFFF;
    border:1px solid #2DB560;
    border-radius: 8px;
  }
  .Toastify__toast--warning {
    background-color: #FFFFFF;
    border:1px solid #FAB11E;
    border-radius: 8px;
  }
  .Toastify__toast--error {
    background-color: #FFFFFF;
    border:1px solid #FA6464;
    border-radius: 8px;
  }
  .Toastify__close-button {
    color: #A6A8B2;
  }
`;
