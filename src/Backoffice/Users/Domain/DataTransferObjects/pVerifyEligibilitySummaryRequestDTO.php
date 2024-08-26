<?php

declare(strict_types=1);

namespace Lightit\Backoffice\Users\Domain\DataTransferObjects;

class pVerifyEligibilitySummaryRequestDTO
{
    public function __construct(
        public string $payerCode,
        public string $payerName,
        public string $Provider_LastName,
        public string $Provider_NPI,
        public string $Provider_PIN,
        public string $Patient_First,
        public string $Patient_DOB,
        public string $Patient_Last,
        public string $memberID,
        public string $Date_Of_Service,
        public string $referenceId,
        public string $Location,
        public string $PracticeTypeCode,
        public string $IncludeTextResponse,
        public string $InternalId,
        public string $CustomerID,
    ) {
    }

    public function toArray(): array
    {
        return [
            'payerCode' => $this->payerCode,
            'payerName' => $this->payerName,
            'Provider_LastName' => $this->Provider_LastName,
            'Provider_NPI' => $this->Provider_NPI,
            'Provider_PIN' => $this->Provider_PIN,
            'Patient_First' => $this->Patient_First,
            'Patient_DOB' => $this->Patient_DOB,
            'Patient_Last' => $this->Patient_Last,
            'memberID' => $this->memberID,
            'Date_Of_Service' => $this->Date_Of_Service,
            'referenceId' => $this->referenceId,
            'Location' => $this->Location,
            'PracticeTypeCode' => $this->PracticeTypeCode,
            'IncludeTextResponse' => $this->IncludeTextResponse,
            'InternalId' => $this->InternalId,
            'CustomerID' => $this->CustomerID,
        ];
    }
}
